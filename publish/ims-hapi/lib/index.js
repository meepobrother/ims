"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("hapi");
const Segment = require('@hapi/call/lib/segment');
const Hoek = require('@hapi/hoek');
class ImsSegment extends Segment {
    add(segments, record) {
        const current = segments[0];
        const remaining = segments.slice(1);
        const isEdge = !remaining.length;
        const literals = [];
        let isLiteral = true;
        for (let i = 0; i < segments.length && isLiteral; ++i) {
            isLiteral = segments[i].literal !== undefined;
            literals.push(segments[i].literal);
        }
        if (isLiteral) {
            this._fulls = this._fulls || {};
            let literal = '/' + literals.join('/');
            if (!record.settings.isCaseSensitive) {
                literal = literal.toLowerCase();
            }
            try {
                Hoek.assert(!this._fulls[literal], 'New route', record.path, 'conflicts with existing', this._fulls[literal] && this._fulls[literal].record.path);
                this._fulls[literal] = { segment: current, record };
            }
            catch (e) {
                // console.log(`New route ${record.path} conflicts with existing ! ${new Date().getTime()}`)
                this._fulls[literal] = { segment: current, record };
            }
        }
        else if (current.literal !== undefined) { // Can be empty string
            // Literal
            this._literals = this._literals || {};
            const currentLiteral = (record.settings.isCaseSensitive ? current.literal : current.literal.toLowerCase());
            this._literals[currentLiteral] = this._literals[currentLiteral] || new ImsSegment();
            this._literals[currentLiteral].add(remaining, record);
        }
        else if (current.wildcard) {
            // Wildcard
            Hoek.assert(!this._wildcard, 'New route', record.path, 'conflicts with existing', this._wildcard && this._wildcard.record.path);
            Hoek.assert(!this._param || !this._param._wildcard, 'New route', record.path, 'conflicts with existing', this._param && this._param._wildcard && this._param._wildcard.record.path);
            this._wildcard = { segment: current, record };
        }
        else if (current.mixed) {
            // Mixed
            this._mixed = this._mixed || [];
            let mixed = this._mixedLookup(current);
            if (!mixed) {
                mixed = { segment: current, node: new ImsSegment() };
                this._mixed.push(mixed);
                this._mixed.sort(mixed);
            }
            if (isEdge) {
                Hoek.assert(!mixed.node._edge, 'New route', record.path, 'conflicts with existing', mixed.node._edge && mixed.node._edge.record.path);
                mixed.node._edge = { segment: current, record };
            }
            else {
                mixed.node.add(remaining, record);
            }
        }
        else {
            // Parameter
            this._param = this._param || new ImsSegment();
            if (isEdge) {
                Hoek.assert(!this._param._edge, 'New route', record.path, 'conflicts with existing', this._param._edge && this._param._edge.record.path);
                this._param._edge = { segment: current, record };
            }
            else {
                Hoek.assert(!this._wildcard || !remaining[0].wildcard, 'New route', record.path, 'conflicts with existing', this._wildcard && this._wildcard.record.path);
                this._param.add(remaining, record);
            }
        }
    }
}
exports.ImsSegment = ImsSegment;
function default_1(options) {
    const server = new hapi_1.Server(options);
    const sort = function (a, b) {
        const aFirst = -1;
        const bFirst = 1;
        const as = a.segments;
        const bs = b.segments;
        if (as.length !== bs.length) {
            return (as.length > bs.length ? bFirst : aFirst);
        }
        for (let i = 0; i < as.length; ++i) {
            if (as[i] && as[i].literal) {
                if (bs[i].literal) {
                    if (as[i].literal === bs[i].literal) {
                        continue;
                    }
                    return (as[i].literal > bs[i].literal ? bFirst : aFirst);
                }
                return aFirst;
            }
            if (bs[i] && bs[i].literal) {
                return bFirst;
            }
            return ((as[i] && as[i].wildcard) ? bFirst : aFirst);
        }
    };
    server._core.router.add = (config, route) => {
        const _that = server._core.router;
        const method = config.method.toLowerCase();
        const vhost = config.vhost || '*';
        if (vhost !== '*') {
            _that.vhosts = _that.vhosts || {};
            _that.vhosts[vhost] = _that.vhosts[vhost] || {};
        }
        const table = (vhost === '*' ? _that.routes : _that.vhosts[vhost]);
        table[method] = table[method] || { routes: [], router: new ImsSegment() };
        const analysis = config.analysis || _that.analyze(config.path);
        const record = {
            path: config.path,
            route: route || config.path,
            segments: analysis.segments,
            params: analysis.params,
            fingerprint: analysis.fingerprint,
            settings: _that.settings,
            time: new Date().getTime()
        };
        // Add route
        table[method].router.add(analysis.segments, record);
        // table[method].router.add(analysis.segments, record);
        const routes = table[method].routes;
        const index = routes.findIndex(it => {
            return it.path === record.path && it.fingerprint === record.fingerprint;
        });
        if (index > -1) {
            routes.splice(index, 1, record);
        }
        else {
            routes.push(record);
        }
        table[method].routes.sort(sort);
        const last = record.segments[record.segments.length - 1];
        if (last.empty) {
            console.log(last.empty);
            table[method].router.add(analysis.segments.slice(0, -1), record);
        }
        if (config.id) {
            // 移除以便更新
            _that.ids[config.id] = record;
        }
        return record;
    };
    return server;
}
exports.default = default_1;

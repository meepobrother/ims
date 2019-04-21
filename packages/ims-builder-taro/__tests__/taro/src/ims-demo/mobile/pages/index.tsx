import { AtNoticebar } from 'taro-ui';
import Taro from '@tarojs/taro';

export default class Index extends Taro.Component {
    onPullDownRefresh() {
        Taro.startPullDownRefresh();
        this.refresh()
    }
    refresh() {
        setTimeout(() => {
            Taro.stopPullDownRefresh();
        }, 1000)
    }
    render() {
        return <AtNoticebar></AtNoticebar>
    }
}

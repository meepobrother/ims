import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './app.scss';
class App extends Taro.Component {
    config = {
        pages: ["ims-demo/mobile/pages/index"]
    }
    render() {
        return <View>View</View>
    }
}
Taro.render(<App />, document.getElementById('app'))
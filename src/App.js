import Routing from "./routing";
import { useIdleTimer } from 'react-idle-timer'
import { signout } from './auth'
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();
  const handleOnIdle = event => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
    if (getRemainingTime() === 0) {
      signout();
      history.push("/");
      console.log('logged out');
    }

  }

  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
    reset()
  }

  const handleOnAction = event => {
    console.log('user did something', event)

  }

  const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
    timeout: 1000 * 60 * 20,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })




  return <Routing />;
}

export default App;

import { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getUserRequest } from "../redux/actions/users";
// function* testing() {
//   // under the hoop the takeEvery saga is runnung in while true loop and constantly watching all the saga
//  while(true) {
//   console.log(1);
//   yield 1;
//   console.log(2);

//   yield 2;
//   console.log(3);

//   yield 3;
//   console.log(4);
//  }
// }

// function App() {
//   const iterator = testing();
//   console.log(iterator.next()); //{value: 1, done: false}
//   console.log(iterator.next()); //{value: 2, done: false}
//   console.log(iterator.next()); //{value: 3, done: false}
//   console.log(iterator.next()); //{value: undefined, done: true}
//   return (
//     <div>
//       <h1>Hello From App</h1>
//     </div>
//   );
// }

// function App() {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(getUserRequest())
//   }, [dispatch])
//   return (
//     <div>
//       <h1>Hello From App</h1>
//     </div>
//   );
// }
// export default App;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.getUser = this.props.getUserRequest.bind(this);
  // }
  componentDidMount() {
    this.props.getUserRequest()
  }
  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default connect(null, {
  getUserRequest,
})(App);

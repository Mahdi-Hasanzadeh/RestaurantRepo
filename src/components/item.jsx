// import React, { Component } from "react";

// class Items extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isShow: false
//     };
//   }
//   handleClick() {
//     this.setState({ isShow: !this.state.isShow });
//     console.log(`${this.props.data.name}: ${this.state.isShow}`);
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <li>
//           <img src={this.props.data.image} alt="" />
//           <div className="body">
//             <h2>{this.props.data.name}</h2>
//             <p>{this.state.isShow && this.props.data.description}</p>
//             <button
//               onClick={() => {
//                 this.handleClick();
//               }}
//             >
//               {this.state.isShow ? "Hide Description" : "Show Description"}
//             </button>
//           </div>
//         </li>
//       </React.Fragment>
//     );
//   }
// }

// export default Items;

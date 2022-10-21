// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form, FormGroup, Col, Label, Input } from "reactstrap";
// import { app, database } from "./firebaseconfig.js";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword
// } from "firebase/auth";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// //C () ?

// export default function App() {
//   const [formData, setFormData] = React.useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const auth = getAuth();
//   const dbInstance = collection(database, "users");
//   const handlechange = event => {
//     const { name, value } = event.target;
//     setFormData(prevData => {
//       return {
//         ...prevData,
//         [name]: value
//       };
//     });
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     addDoc(dbInstance, formData)
//       .then(res => {
//         console.log(res.id);
//       })
//       .catch(error => {
//         alert(error.message);
//       });
//   };
//   React.useEffect(() => {
//     getData();
//     console.log("effect");
//   }, []);
//   let data = [];
//   const getData = async () => {
//     try {
//       const response = await getDocs(dbInstance);
//       const data = await response.docs.map(item => {
//         console.log(item.data());
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   console.log(data);
//   return (
//     <div className="container mt-2">
//       <div className="row ">
//         <div className="col-md-8 ">
//           <Form onSubmit={handleSubmit}>
//             <FormGroup row>
//               <Label md={2}>Name</Label>
//               <Col md={10}>
//                 <Input
//                   type="text"
//                   onChange={handlechange}
//                   name="name"
//                   value={formData.name}
//                   placeholder="Name"
//                 />
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Label md={2}>Email</Label>
//               <Col md={10}>
//                 <Input
//                   type="text"
//                   onChange={handlechange}
//                   name="email"
//                   value={formData.email}
//                   placeholder="Email"
//                 />
//               </Col>
//             </FormGroup>
//             <FormGroup row>
//               <Label md={2}>Password</Label>
//               <Col md={10}>
//                 <Input
//                   type="text"
//                   placeholder="Password"
//                   onChange={handlechange}
//                   name="password"
//                   value={formData.password}
//                 />
//               </Col>
//             </FormGroup>
//             <FormGroup>
//               <Input id="sign" name="sign" type="submit" value="sign up" />
//             </FormGroup>
//           </Form>
//         </div>
//       </div>
//       <button onClick={getData}>getData</button>
//     </div>
//   );
// }

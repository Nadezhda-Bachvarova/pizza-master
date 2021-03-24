// import React, { Component } from 'react';

// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Aux/Aux';

// const withErrorHandler = (WrappedComponent, axios) => {
//     return class extends Component {
//         state = {
//             error: null
//         }

//         UNSAFE_componentWillMount () {
//             //if I have request, don't need from error
//             this.reqInterceptors = axios.interceptors.response.use(req => {
//                 this.setState({ error: null }); 
//                 return req;
//             });
//             //if I haven't request, I get error message from Firebase
//             this.resInterceptors = axios.interceptors.response.use(res => res, error => {
//                 this.setState({ error: error })
//             });
//         }

//         UNSAFE_componentWillUnmount() {
//             axios.interceptors.request.eject(this.reqInterceptors);
//             axios.interceptors.response.eject(this.resInterceptors);
//         }

//         errorConfirmedHandler = () => {
//             this.setState({ error: null });
//         }

//         render() {
//             return (
//                 <Aux>
//                     <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
//                         { this.state.error ? this.state.error.message : null }
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             )
//         }
//     }
// }

// export default withErrorHandler;
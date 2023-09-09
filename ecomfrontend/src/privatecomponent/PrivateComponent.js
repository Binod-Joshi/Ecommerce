import { useSelector } from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom';

const PrivateComponent = () => {
    const {currentUser} = useSelector((state) => state.user);

    return currentUser?.email ? <Outlet/> : <Navigate to='/login' replace />
}

export default PrivateComponent;
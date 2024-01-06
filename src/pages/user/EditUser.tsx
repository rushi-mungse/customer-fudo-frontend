import { useParams } from "react-router-dom";

const EditUser = () => {
    const { userId } = useParams();
    console.log(userId);
    return <div>EditUser</div>;
};

export default EditUser;

import { useParams } from "react-router-dom";

const EditUser = () => {
    const { userId } = useParams();
    console.log(userId);
    return <h1>Hii</h1>;
};

export default EditUser;

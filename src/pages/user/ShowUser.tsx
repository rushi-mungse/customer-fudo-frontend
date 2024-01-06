import { useParams } from "react-router-dom";

const ShowUser = () => {
    const { userId } = useParams();
    console.log(userId);
    return <div>ShowUser</div>;
};

export default ShowUser;

import CardSkeleton from "../../pages/HomePage/card-skeleton/CardSkeleton";
import Loader from "../loader/Loader";

type QueryLoadingProps = {
    variant?:"list"|"spinner";
}

const QueryLoading = ({variant = "spinner"}:QueryLoadingProps) => {
    if(variant === "spinner"){
        return <Loader />;
    }
    return <CardSkeleton />;
}

export default QueryLoading;
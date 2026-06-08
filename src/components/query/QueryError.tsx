type QueryErrorProps = {
    message: string;
    error: Error;
    onRetry: () => void;
}
const QueryError = ({message, error, onRetry}:QueryErrorProps) => {
    const detail = error?.message ?? "알 수 없는 오류가 발생했습니다.";

    return (
        <div className="query_error">
            <h3>{message}</h3>
            <p>{detail}</p>
            <button onClick={onRetry}>다시 시도</button>
        </div>
    )
}

export default QueryError;
interface StatCardProps {
    title: string;
    value: number;
    icon: string;
}

const Card = ({ title, value, icon }: StatCardProps) => {
    return (
        <div className="col-md-3">
            <div className="card bg-secondary text-light h-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <small className="text-muted">{title}</small>
                            <h4 className="mt-1">{value}</h4>
                        </div>
                        <i className={`bi bi-${icon} fs-3 text-info`}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
const cardForDashboard = (props) => {
    return <div className="card removeBoxShadow" style={borderRadius}>
        <div className="card-body table-responsive" >
            <div className="row align-items-center mh-100" >
                <div className="col-12 col-lg-8">
                    <div className="compare">
                        <p className="mt-0 fontWeight700 fontSize09">{props.upper}</p>
                        <div className="d-flex flex-column" >
                            <span style={marginTop}>{props.lower}</span>
                            <span>
                            {
                                props.rate<0 ?
                                    <span >
                                        <i className="icofont icofont-long-arrow-down"
                                           style={iNegatif}/>
                                        <span className='fontSize08' style={spanNegatif}>{(props.rate).toFixed(2)}%</span>
                                    </span>
                                    :
                                    <span >
                                        {/*<i className="icofont icofont-long-arrow-up"
                                           style={iPozitif}/>*/}
                                       <span className='fontSize08' style={spanPozitif}>{(props.rate).toFixed(2)}%</span>
                                    </span>

                            }
                                {/*25 px fontSize */}
                        </span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 my-auto">
                    <div className="text-right">
                        <h4 className='fontWeight700'>{props.right}</h4>
                    </div>
                </div>
            </div>

        </div>
    </div>;
};

const iNegatif = {
    fontSize: "20px",
    color: "#ff1a1a"
};
const spanNegatif = {
    marginTop: '2px',
    color: '#ff1a1a'
};

const iPozitif = {
    fontSize: "20px",
    color: "#55bc3f"
};
const spanPozitif = {
    marginTop: '2px',
    color: '#55bc3f'
};

const marginTop = {
    marginTop: "2px"
};

const borderRadius = {
    borderRadius:'5px'
}

export default cardForDashboard;

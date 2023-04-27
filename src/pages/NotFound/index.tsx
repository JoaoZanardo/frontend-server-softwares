import { ReactElement } from "react";
import './style.css';
import { Link } from "react-router-dom";

const NotFound = (): ReactElement => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>


                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Parece que você está perdido
                                </h3>

                                <p>A página que você que esta procurando não existe!</p>

                                <Link to="/" className="link_404">Voltar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
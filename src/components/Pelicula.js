import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Pelicula extends Component{

    Marcar = () => {
        this.props.MarcarFavorita(this.props.pelicula, this.props.indice);
    }

    render(){
        const {titulo, image} = this.props.pelicula;

        return(
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo} />
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                    hace 5 minutos
                </span>
                <Link to="/blog">Leer más</Link>
                <button onClick={this.Marcar}>Marcar como favorita</button>
                <div className="clearfix"></div>
            </article>
        )
    }
}

export default Pelicula;
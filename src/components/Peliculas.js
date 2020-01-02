import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {

    state = {};

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        //var random = Math.floor(Math.random() * 3)
        peliculas[0].titulo = "Batman Begins"

        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log('Favorita marcada');
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    componentWillMount() {
        // alert('Se va a montar el componente');
        this.setState({
            peliculas: [
                { titulo: 'Batman vs Superman', image: 'http://www.encadenados.org/rdc/images/stories/sin_perdon/num_91/batman-v-superman-3.jpg' },
                { titulo: 'Gran torino', image: 'https://rzpict1.blob.core.windows.net/images/autoscout24.it/RZCATSIT272389BC6B6B/FORD-GRAN-TORINO-00.jpg' },
                { titulo: 'Looper', image: 'https://cdn2.actitudfem.com/media/files/styles/large/public/images/2012/10/looper.jpg' }
            ],
            nombre: 'Sebastián García Arias',
            favorita: {}
        });
    }

    /*componentDidMount(){
        alert('Ya se ha montado el component');
    }*/

    componentWillUnmount() {
        //alert('Me voy a desmontar');
    }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };
        return (
            <React.Fragment>
                <Slider
                    title="Peliculas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Selección de las peliculas favoritas de: {this.state.nombre}</p>
                        <p><button onClick={this.cambiarTitulo}>Cambiar titulo de batman</button></p>
                        {this.state.favorita.titulo ? (
                            <p className="favorita" style={pStyle}>
                                <strong>La pelicula favorita es: </strong>
                                <span>{this.state.favorita.titulo}</span>
                            </p>
                        ) : (
                                <p>No hay pelicula favorita</p>
                            )
                        }


                        {/*Crear componente pelicula*/}
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            MarcarFavorita={this.favorita} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Peliculas;
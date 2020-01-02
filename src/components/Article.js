import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            }).catch(err => {
                this.setState({
                    articles: false,
                    status: 'success'
                });
            });
    }

    deleteArticle = (id) => {
        swal({
            title: "Estás seguro?",
            text: "Borraras permanentemente tu artículo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });
                        });
                    swal(
                        'Articulo Borrado',
                        'El articulo ha sido borrado correctamente',
                        'success'
                    );
                } else {
                    swal(
                        'Tranquilo',
                        'No se ha borrado nada!!',
                        'success'
                    );
                }
            });
        /* */
    }

    render() {
        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.article &&
                        <article className="article-item article-detail">

                            <div className="image-wrap">
                                {article.image != null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEX////d3d3l5eXz8/Po6Oj7+/v4+Pjf39/b29vi4uLw8PD29vbs7Ozp6elG0luKAAACs0lEQVR4nO3b67ZjMBiAYUTkgPu/3aGloi07ulL9Yt5n/u2D8a5UJaldFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB1NSq5Vv86KqScSa9vfp21aFyZnC3L/tddC58+cOTkDKIvzfAvLSOs8CsoPNFUaKpEnNTCqtFJFN5ILUx1j1YUno7Coyg835vCxldV7T88xQwKm760ow/XB/IL28daw350luILp8XU7TTtJxen+MIunFza7vjxpBc2zi6Bw7Lq+PGkF6pyxbaHjye98GktZf3h41F4vv/tVbraeRvO9fjxpBcWnQ2HcPdu0bTev279ii8MB9G6nTu+7pwZNz/808+ILyzU445o3c5VqCp7+zlb1usW+YVFU5u/Z97e2GWkVfidDAoL3fq66t9cYi+/NL8jhfeUHApH+1Pu237aY6N8mNwFo5hL4S718ilAkHiFQvXmg44l8QKFrbHPfWFi/oWr9dWbt5vsC/VG4CMx90JdbfXNiZkX6nojcBnFvAt1v/9x8ZiYd2G/lzclZl3Y7bTNiSrnwojAcTllTK6FUYG3Z2lMnoWb94nXYcx1DLV3ZfyTNzkWjsv/+KeLcinU66+28c/AZVLYVq5bnWnrLjWGurst5etwG0btZmVWuLwkXbAP47eWFtkV6m6+sw2s6R7frm3UC1V84bhraqZCc2+cTlnHXYrCC5t5ih20WNPfN4jjLkXRhVq9Wceb0k6Nuoq5FCUXtvXmbf3+Wn3dTMyqcJib2b3JmfM66tl3sYXt3/Prqs55DLtkz7TLLGyOLB5yLOwjpyu5Fs7vMIkGUV7h6vOySxamRuGJKLxAYeo/XJNX+JVAYYXfGEVBhVFroeOS/f1GAv03Eo36+z8+jfZ1cr2kQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADH/AP5HCXaWO8W3wAAAABJRU5ErkJggg==" alt={article.title} />
                                    )
                                }
                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <button onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            }
                                className="btn btn-danger">Eliminar</button>
                            <Link to={"/blog/editar/" + article._id} className="btn btn-warning">Editar</Link>

                            <div className="clearfix"></div>
                        </article>
                    }


                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Intentalo de nuevo mas tarde</p>
                        </div>
                    }

                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando</h2>
                            <p>Espere unos segundos</p>
                        </div>
                    }

                </section>
                <Sidebar />
            </div>
        );
    }
}

export default Article;
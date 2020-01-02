import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';

class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null
    };

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;

        if(home === "true"){
            this.getLastArticles();

        }else if(search && search !== null && search !== undefined){
            this.getArticlesBySearch(search);
        }else{
            this.getArticles();
        }
        
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + 'search/' + searched)
            .then(res => {
                    this.setState({
                        articles: res.data.articles,
                        status: 'success'
                    });
            })
            .catch (err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        axios.get(this.url + 'articles/last')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            });
    }

    getArticles = () => {
        axios.get(this.url + 'articles')
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            });
    }
    render() {
        if (this.state.articles.length >= 1) {
            var listArticles = this.state.articles.map((article) => {
                return (
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image != null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ):(
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEX////d3d3l5eXz8/Po6Oj7+/v4+Pjf39/b29vi4uLw8PD29vbs7Ozp6elG0luKAAACs0lEQVR4nO3b67ZjMBiAYUTkgPu/3aGloi07ulL9Yt5n/u2D8a5UJaldFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB1NSq5Vv86KqScSa9vfp21aFyZnC3L/tddC58+cOTkDKIvzfAvLSOs8CsoPNFUaKpEnNTCqtFJFN5ILUx1j1YUno7Coyg835vCxldV7T88xQwKm760ow/XB/IL28daw350luILp8XU7TTtJxen+MIunFza7vjxpBc2zi6Bw7Lq+PGkF6pyxbaHjye98GktZf3h41F4vv/tVbraeRvO9fjxpBcWnQ2HcPdu0bTev279ii8MB9G6nTu+7pwZNz/808+ILyzU445o3c5VqCp7+zlb1usW+YVFU5u/Z97e2GWkVfidDAoL3fq66t9cYi+/NL8jhfeUHApH+1Pu237aY6N8mNwFo5hL4S718ilAkHiFQvXmg44l8QKFrbHPfWFi/oWr9dWbt5vsC/VG4CMx90JdbfXNiZkX6nojcBnFvAt1v/9x8ZiYd2G/lzclZl3Y7bTNiSrnwojAcTllTK6FUYG3Z2lMnoWb94nXYcx1DLV3ZfyTNzkWjsv/+KeLcinU66+28c/AZVLYVq5bnWnrLjWGurst5etwG0btZmVWuLwkXbAP47eWFtkV6m6+sw2s6R7frm3UC1V84bhraqZCc2+cTlnHXYrCC5t5ih20WNPfN4jjLkXRhVq9Wceb0k6Nuoq5FCUXtvXmbf3+Wn3dTMyqcJib2b3JmfM66tl3sYXt3/Prqs55DLtkz7TLLGyOLB5yLOwjpyu5Fs7vMIkGUV7h6vOySxamRuGJKLxAYeo/XJNX+JVAYYXfGEVBhVFroeOS/f1GAv03Eo36+z8+jfZ1cr2kQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADH/AP5HCXaWO8W3wAAAABJRU5ErkJggg==" alt={article.title} />
                            )
                        }
                            
                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow>{article.date}</Moment>
                    </span>
                        <Link to={'/blog/articulo/'+ article._id}>Leer más</Link>
                        <div className="clearfix"></div>
                    </article>
                );
            });
            return (
                <div id="articles">
                    {listArticles}
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavía no hay nada en esta sección</p>
                </div>
            );
        }else{
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        }
    }
}

export default Articles;
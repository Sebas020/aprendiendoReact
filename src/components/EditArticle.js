import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Global from '../Global';
import Sidebar from './Sidebar';
import swal from 'sweetalert';

//1. Tenemos que recoger el id del artículo a editar de la url
//2. Tenemos que crear un método para sacar ese objeto del backend
//3. Repoblar / rellenar el formulario con esos datos
//4. Actualizar el objeto haciendo petición al backend

class EditArticle extends Component {
    url = Global.url;

    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();
    //Aqui se crea el state
    state = {
        article: {},
        status: null,
        selectedFile: null
    };
//Funciones del ciclo de vida de aangular
    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido.'
            },
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                    this.setState({
                        article: res.data.article
                    })
            })
    }

    changeState = () => {
        //Este es el state, lo que hace el databigning posible, aqui se modifica
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });
        //Forzar a que se muestren los mensajes de error en caso de haberlos con validaror libreria
        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();
        //Rellenar state con formulario
        this.changeState();

        if (this.validator.allValid()) {

            //Hacer petición http por post para guardar el artículo
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {

                        this.setState({
                            article: res.data.article,
                            status: 'success'
                        });

                        swal(
                            'Articulo creado',
                            'El articulo ha sido creado correctamente',
                            'success'
                        );

                        //Subir la imagen

                        if (this.state.selectedFile !== null) {
                            //Sacar el id de el articulo guardado
                            var articleId = this.state.article._id;
                            //Crear formData y añadir fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );
                            //Petición ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });
                        } else {
                            this.setState({
                                staus: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            staus: 'failed'
                        });
                    }
                });
        } else {
            this.setState({
                staus: 'failed'
            });
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    render() {
        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Artículo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />
                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} ></textarea>
                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {article.image != null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                    ) : (
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEX////d3d3l5eXz8/Po6Oj7+/v4+Pjf39/b29vi4uLw8PD29vbs7Ozp6elG0luKAAACs0lEQVR4nO3b67ZjMBiAYUTkgPu/3aGloi07ulL9Yt5n/u2D8a5UJaldFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB1NSq5Vv86KqScSa9vfp21aFyZnC3L/tddC58+cOTkDKIvzfAvLSOs8CsoPNFUaKpEnNTCqtFJFN5ILUx1j1YUno7Coyg835vCxldV7T88xQwKm760ow/XB/IL28daw350luILp8XU7TTtJxen+MIunFza7vjxpBc2zi6Bw7Lq+PGkF6pyxbaHjye98GktZf3h41F4vv/tVbraeRvO9fjxpBcWnQ2HcPdu0bTev279ii8MB9G6nTu+7pwZNz/808+ILyzU445o3c5VqCp7+zlb1usW+YVFU5u/Z97e2GWkVfidDAoL3fq66t9cYi+/NL8jhfeUHApH+1Pu237aY6N8mNwFo5hL4S718ilAkHiFQvXmg44l8QKFrbHPfWFi/oWr9dWbt5vsC/VG4CMx90JdbfXNiZkX6nojcBnFvAt1v/9x8ZiYd2G/lzclZl3Y7bTNiSrnwojAcTllTK6FUYG3Z2lMnoWb94nXYcx1DLV3ZfyTNzkWjsv/+KeLcinU66+28c/AZVLYVq5bnWnrLjWGurst5etwG0btZmVWuLwkXbAP47eWFtkV6m6+sw2s6R7frm3UC1V84bhraqZCc2+cTlnHXYrCC5t5ih20WNPfN4jjLkXRhVq9Wceb0k6Nuoq5FCUXtvXmbf3+Wn3dTMyqcJib2b3JmfM66tl3sYXt3/Prqs55DLtkz7TLLGyOLB5yLOwjpyu5Fs7vMIkGUV7h6vOySxamRuGJKLxAYeo/XJNX+JVAYYXfGEVBhVFroeOS/f1GAv03Eo36+z8+jfZ1cr2kQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADH/AP5HCXaWO8W3wAAAABJRU5ErkJggg==" alt={article.title} className="thumb" />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>
                <Sidebar />
            </div>
        );
    }
}

export default EditArticle;
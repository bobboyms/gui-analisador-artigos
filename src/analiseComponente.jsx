import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class AnaliseComponente extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            analiseMedia: { densidadeMedia: 0}
        }

    }

    componentDidUpdate() {
        $(document).ready(function(){
            //$('.collapsible').collapsible();
            $(".collapsible-header").addClass("active"); //manter campos abertos ao iniciar
            $('.collapsible').collapsible({accordion: false}); // accordion serve para não deixar um campo fechar ao abrir outro
          });

    }

    componentDidMount() {

          const { urls,  palavraChave} = this.props;

          const urlsDTO = {
            urls: urls,
            palavraChave: palavraChave
           }
           
          axios.post('http://127.0.0.1:8080/analise-media-concorrentes', urlsDTO)
          .then((response) => {
              console.log(response.data)
              const analiseMedia = response.data;
              this.setState({ analiseMedia });
       })
    }

    //mano, melhor organizar isso em funcoes, fazer td no corpo do JSX fica dificil de entender
    // rodae

    renderAlgumacoisa() {

        const { sitesDto } = this.state.analiseMedia;

        return sitesDto.map((valor, index) => {
            console.log(1,valor);

            let arWords = valor.palavraDtos.map((palavra, indice) => {
                return (<tr key={indice} role="row" className="odd">
                    <td>{palavra.palavra}</td>
                    <td>{palavra.frequencia}</td>
                    <td>{palavra.similaridade}</td>
                </tr>); // Dadaaaaaaa
            });

            return (
                <div key={index} className="col s12 m4">
                    <div className="icon-block">
                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header">
                                    <i className="material-icons Small">book</i> {valor.titulo} <br />
                                    {valor.url}
                                </div>
                                <div className="collapsible-body">
                                    <table className="responsive-table centered">
                                        <thead>
                                            <tr role="row">
                                                <th>Palavra</th>
                                                <th>Frequencia</th>
                                                <th>Similaridade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arWords}
                                        </tbody>
                                    </table>

                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            );
        });

    }

    render() {

        const { handleClickProcessar } = this.props;
        const { sitesDto } = this.state.analiseMedia;

        console.log(sitesDto)

        if (this.state.analiseMedia && this.state.analiseMedia.densidadeMedia == 0) {
            return(<h1>PROCESSANDO AGUARDE... </h1>)
        }

        return(
            /** BLOCO DE RESUMO GERAL **/
            <div className="section">

                <div className="row center">
                        <button onClick={(event) => {
                                handleClickProcessar("principal");
                            }}
                            className="btn-large waves-effect waves-light orange">
                                ANALISAR
                        </button>
                    </div>

                <h1>React</h1>
		        <div className="row">
                    <div className="col s12 m12">
                        <div className="icon-block">
                            <ul className="collapsible">
                                <li>
                                    <div className="collapsible-header">
                                            <i className="material-icons Small">book</i> Informação 1 <span
                                                className="new badge">1</span>
                                        </div>
                                        <div className="collapsible-body">
                                            <table className="responsive-table centered">
                                                <thead>
                                                    <tr role="row">
                                                        <th>Densidade média</th>
                                                        <th>Distancia média</th>
                                                        <th>Quantidade de palavras</th>
                                                        <th>Similaridade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr role="row" className="odd">
                                                        <td>{this.state.analiseMedia.densidadeMedia}</td>
                                                        <td>{this.state.analiseMedia.distanciaMedia}</td>
                                                        <td>{this.state.analiseMedia.quantidadeDePalavras}</td>
                                                        <td>{this.state.analiseMedia.similaridadeMedia}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>    
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {this.renderAlgumacoisa()}
                   

                    <div className="col s12 m12">
                        <div className="icon-block">

                            <ul className="collapsible">
                                <li>
                                    <div className="collapsible-header">
                                        <i className="material-icons Small">book</i> <b>TEMAS
                                            IMPORTANTES</b> <span className="new badge">1</span>
                                    </div>
                                    <div className="collapsible-body">

                                        <div className="row">
                                            <div className="col s12">
                                                <div className="card blue-grey darken-1">
                                                    <div className="card-content white-text">
                                                        <span className="card-title">Sub titulos importantes</span>
                                                        <p>Abaixo é mostrado sobre quais temas você deve falar
                                                            para essa palavra chave <b>PALAVRA CHAVE</b> Esse temas
                                                            tambem devem ser os titulos H2 no seu texto.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table className="striped">
                                            <tbody>

                                            
                                                <tr role="row" className="odd">
                                                    <td>Frase</td>
                                                    <td>0.8</td>
                                                </tr>
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

           

        );
    }



}



export default AnaliseComponente;


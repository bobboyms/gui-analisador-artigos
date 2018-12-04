import React from "react";
import ReactDOM from "react-dom";
import AnaliseComponente from "./analiseComponente"
//import $ from 'jquery';
/***
 * 
 * Componente controla toda aplicação
 * 
 */
class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            urls : ["https://www.agendor.com.br/blog/o-que-e-bcg/",
                    "https://neilpatel.com/br/blog/matriz-bcg/",
                    "https://klickpages.com.br/blog/matriz-bcg/",
                    "https://www.treasy.com.br/blog/matriz-bcg/"],
            url: "wwww.google.com",
            palavraChave : "matriz bcg",
            telaAtual : "principal"
        };
    }

    validarURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?'+ // port
            '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            
        return !pattern.test(str);
      }

    handleClickProcessar = (tela) => {
        
        if (this.state.palavraChave.trim().length === 0) {
            alert("Digite uma palavra chave");
            return;
        }
        
        this.setState({
            telaAtual: tela
        })
    };

    adicionarUrlNaLista = () => {

        let urlTmp = this.state.url;

        console.log(urlTmp.length)

        if (this.validarURL(urlTmp)) {
            alert("Digite uma url valida")
            return;
        }

        this.setState({
            urls: this.state.urls.concat(this.state.url),
            url: ""
        })
    }

    removerUrlDaLista = (index) => {
        var urls = [...this.state.urls];
        urls.splice(index, 1)
        this.setState({urls})

    }

    mudarValorCampoFormulario = (campo, valor) => {
        
        let newState = {};
        newState[campo] = valor;

        //console.log(newState)

        this.setState(newState);
    }

    componentDidMount() {

    }

    render() {

        //console.log(this.state.telaAtual)

        

        if (this.state.telaAtual === "principal") {
                return(
                    <UrlComponente 
                        handleClickProcessar={this.handleClickProcessar}
                        mudarValorCampoFormulario={this.mudarValorCampoFormulario}
                        palavraChave={this.state.palavraChave}
                        url={this.state.url}
                        adicionarUrlNaLista={this.adicionarUrlNaLista}
                        urls={this.state.urls}
                        removerUrlDaLista={this.removerUrlDaLista} />
                    );
         } else 
         if(this.state.telaAtual === "analise") {
                return(<AnaliseComponente
                    handleClickProcessar={this.handleClickProcessar}
                    urls={this.state.urls}
                    palavraChave={this.state.palavraChave} />)
        }

        return <h1>NADA RENDERIZADO</h1>;        
    }

}

const UrlComponente = ({handleClickProcessar, mudarValorCampoFormulario, 
        palavraChave, url, urls, adicionarUrlNaLista, removerUrlDaLista}) => {
    return(
        <div className="section no-pad-bot" id="index-banner">
            
                <div className="container">
                    <br />
                    <h1 className="header center orange-text">Analisador de Texto</h1>
                    <div className="row center">
                        <h5 className="header col s12 light">Informe abaixo o link do seu
                            texto e a palavra chave dele</h5>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="palavra_chave" name="palavra_chave" required="" type="text"
                                value={palavraChave}
                                
                                onChange={
                                            (event) => {
                                                mudarValorCampoFormulario('palavraChave', event.target.value)
                                            }
                                            
                                            }/>
                            <label className="active" htmlFor="palavra_chave">Digite uma Palavra Chave</label>
                        </div>
                        
                        <div className="input-field col s12">
                            <input id="palavra_url" name="palavra_url" required="" type="text"
                            value={url}
                                
                            onChange={
                                        (event) => {
                                            mudarValorCampoFormulario('url', event.target.value)
                                        }
                                        
                                     }
                            onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            console.log(event.key)
                                            adicionarUrlNaLista();
                                        }
                                    }} 
                                     />
                            <label className="active" htmlFor="palavra_url">Digite uma URL</label>
                            <button onClick={adicionarUrlNaLista}>
                                Adicionar
                            </button>
                        </div>

                    </div>
                    
                    <ul className="note-list">
                        {urls.map((url,index) => (
                            <li key={index}>
                                {url}
                                <button onClick={(event) => {
                                    removerUrlDaLista(index)
                                }}>
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="row center">
                        <button onClick={(event) => {
                                handleClickProcessar("analise");
                            }} 
                            className="btn-large waves-effect waves-light orange">
                                ANALISAR
                        </button>
                    </div>
                    <br />
                </div>
        </div>
    );
};


export default App;
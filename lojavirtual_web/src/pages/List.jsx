import React from 'react'
import { Container, Row, Col, CardColumns, Alert, Jumbotron, Button } from 'react-bootstrap'
import api from '../services/api'
import Cart from '../component/Cart.jsx'
import ProdutoModal from '../component/ProdutoModal.jsx';

class List extends React.Component{
    state = {
        data: [],
        isOpen: false,
        edita: {},
        modo: {}
    };

    constructor(props){
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handlerLoadProduct = this.handlerLoadProduct.bind(this);
        this.handleEditar = this.handleEditar.bind(this);
        this.conso = this.conso.bind(this);
    }

    componentDidMount(){
        this.handlerLoadProduct();
    }

    handleOpenModal(){
        this.setState({isOpen: true})
    }
    conso(value){
        this.setState({modo: value})
    }

     async handleEditar(value){
        await this.setState({edita: value, isOpen: true})
    }

    async handlerLoadProduct(){
       await api.get(`list`)
            .then( (resp) => {
                const { data } = resp.data;
                this.setState({ data });
            })
            .catch((error) => console.log(error.response))
    }

    render(){
        const loader = (e) => this.handlerLoadProduct();
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto" >
                        <Button style={{margin: "12px"}} onClick={this.handleOpenModal} variant="primary">Cadatrar Produto</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="text-center">Produtos da Loja</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <CardColumns>
                            {
                                this.state.data.map( (produto) => {
                                   return(<Cart editar={this.handleEditar} loaderCart={(e)=> loader()} key={produto.id} data={produto} modo={this.state.modo}/>)
                                })
                            }
                        </CardColumns>
                    </Col>
                </Row>
                <ProdutoModal modo={this.conso} show={this.state.isOpen} onHide={()=> this.setState({ isOpen: false })} editar={this.state.edita}/>
            </Container>
        )
    }
}

export default List;

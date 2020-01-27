import React, { useEffect , useState} from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import ProdutoModal from './ProdutoModal.jsx';
import img from './../assets/cart.png'
import api from '../services/api'

const initialState = {
    produto: {id: '', descricao: '', valor: ''},
};

function Cart(props) {

   async function deletar(){
       await api.delete(`delete/${props.data.id}`)
           .then(resp => {
               props.loaderCart();
           }).catch(e => console.log(e))
   }

    function update(value) {
        props.editar(value)
    }

    const {id, descricao, valor} = props.data;

    useEffect(() => {
        props.loaderCart();
    }, [props.modo]);

    return(
        <Card>
            <Card.Body>
                <Card.Title>{descricao}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">R$ {valor}</Card.Subtitle>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Opções
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onSelect={() => update({update: id})}>Editar</Dropdown.Item>
                        <Dropdown.Item onClick={() => deletar()}>Exluir</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card>
    );
}
/*
class Cart extends React.Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);

    }

    state = {
        isOpen: false
    }

    async delete(){
        await api.delete(`delete/${this.props.data.id}`)
            .then(resp => {
                this.props.loaderCart();
                console.log(this.props);
            }).catch(e => console.log(e))
    }


    render(){
        useEffect(()=>{console.log(oi)},[this.state.isOpen]);
        const {descricao, valor} = this.props.data;
        return(
            <Card>
                <Card.Body>
                    <Card.Title>{descricao}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">R$ {valor}</Card.Subtitle>
                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Opções
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setState({ isOpen: true })}>Editar</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.delete()}>Exluir</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
                <ProdutoModal id={valor} show={this.state.isOpen} onHide={()=> this.setState({ isOpen: false })} />
            </Card>
        );
    }
}
*/
export default Cart;

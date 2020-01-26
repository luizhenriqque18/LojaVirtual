import React, { useEffect , useState} from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import api from '../services/api';


function ProdutoModal(props) {

    const [produto, setProduto] = useState({id: '', descricao: '', valor: ''});
    const [modo, setModo] = useState('Cadastrar');
    const [validated, setValidated] = useState(false);

    useEffect(()=>{
        if(props.editar.update){
            async function loadProduto(){
               const resp = await api.get(`findProdutoById/${props.editar.update}`);
               const {id, descricao, valor} = resp.data.data;
                setProduto({id:id, descricao:descricao, valor:valor});
                setModo('Editar');
                setValidated(true);
            }
            loadProduto();
        }
    },[props.editar]);

    function handleInputChange(event){
        const { value, name} = event.target;
        const valor = produto;
        valor[name] = value;
        setProduto({id: valor.id, descricao: valor.descricao, valor: valor.valor});
        if(produto.descricao.length > 0 && produto.valor.length > 0)
            setValidated(true);
        else
            setValidated(false);
    }

    async function handleSubmit() {
        if(validated){
            if(modo === 'Editar'){
                await api.put(`update/?idProduto=${produto.id}`, produto)
                    .then(resp => {
                        const { descricao } = resp.data.data;
                        //this.setState({create: true, msg: `Produto ${descricao} cadastrado com sucesso!`});
                        props.onHide();
                        props.modo(modo);
                    })
            }else {
                await api.post(`create`, produto)
                    .then(resp => {
                        const { descricao } = resp.data.data;
                        //this.setState({create: true, msg: `Produto ${descricao} cadastrado com sucesso!`});
                        props.onHide();
                        props.modo(modo);
                    })
            }
        }
    };

    function clear() {
        setProduto({id: '', descricao: '', valor: ''});
        setValidated(false)
        setModo('Cadastrar');
    }

    return(
        <Modal {...props}
               onShow={() => clear()}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    123
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <Form.Group controlId="formGroupDescricao">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="descricao" type="text" placeholder="Nome do Produto" required onChange={handleInputChange}  value={produto.descricao}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupValor">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control name="valor" type="number" placeholder="Valor do Produto" required onChange={handleInputChange} value={produto.valor}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancelar</Button>
                <Button onClick={()=>handleSubmit()}> {modo} </Button>
            </Modal.Footer>
        </Modal>
    );
}



/*
class ProdutoModal extends React.Component{
    state = {...initialState};

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps)
    }

    handleInputChange(event){
        const { value, name} = event.target;
        const produto = {...this.state.produto};
        produto[name] = value;
        this.setState({ produto: produto });
        if(produto.descricao.length >0 && produto.valor.length > 0)
            this.setState({validated: true})
        else
            this.setState({validated: false})
    }

    async handleSubmit() {
        console.log(this.props)
        if(this.state.validated){
            await api.post(`create`, this.state.produto)
                .then(resp => {
                    const { descricao } = resp.data.data;
                    this.setState({create: true, msg: `Produto ${descricao} cadastrado com sucesso!`});
                    this.props.onHide();
                })
        }
    };

    render(){
        return(
            <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       123
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={this.state.validated}>
                        <Form.Group controlId="formGroupDescricao">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control name="descricao" type="text" placeholder="Nome do Produto" required onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formGroupValor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control name="valor" type="number" placeholder="Valor do Produto" required onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancelar</Button>
                    <Button onClick={()=>this.handleSubmit()}> Cadastrar </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
*/
export default ProdutoModal;

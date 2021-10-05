import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useFormik} from "formik";
import api from "./Api";
import {useState} from "react";

const TestForm = () => {
    const [addressAvailable, setAddressAvailable] = useState(false)
    const [address, setAddress] = useState({
        street: '',
        number: '',
        region: '',
        complement: '',
        city : '',
        state: '',
        country: '',
        postalCode : ''
    });
    const [average, setAverage] = useState(0);

    const formikEndereco = useFormik({
        initialValues : {
            cnpj : ''
        },
        validate : values => {
            const err = {};
            if (!values.cnpj) {
                err.cnpj = "CNPJ não informado";
            }
            return err;
        },
        onSubmit : (values) => {
            setAddressAvailable(false)
            api.get(`/api/test/${values.cnpj}`)
                .then(response=>{
                    setAddress(response.data)
                    setAddressAvailable(true)
                })
        }
    });

    const formikCalc = useFormik({
        initialValues : {
            valueA : 0,
            valueB : 0
        },
        onSubmit: values =>{
            api.post(`/api/test/`, values)
                .then(response=>{
                    setAverage(response.data.average)
                }).catch(error=>{
                const obj = {}
                error.response.data.errors.forEach((item, index) => {
                    obj[item.field] = item.message
                })
                formikCalc.setErrors(obj)
            })
        }
    });

    return (
        <Container>
            <h1>Endereço</h1>
            <Form onSubmit={formikEndereco.handleSubmit} >
                <Form.Group controlId={"cnpj"}>
                    <Form.Label>CNPJ</Form.Label>
                    <Row>
                        <Col sm={'10'}>
                            <Form.Control type="text" placeholder="Informe o CNPJ" onChange={formikEndereco.handleChange}
                                          value={formikEndereco.values.cnpj} isInvalid={formikEndereco.errors.cnpj}/>
                        </Col>
                        <Col sm={'2'}>
                            <Button variant={'primary'} type={"submit"} className={'w-100'} >Consultar</Button>
                        </Col>
                    </Row>
                </Form.Group>
                { addressAvailable && <dl className="row" >
                    <dt className="col-sm-1">CEP</dt>
                    <dd className="col-sm-11">{address.postalCode}</dd>
                    <dt className="col-sm-1">Logradouro</dt>
                    <dd className="col-sm-11">{address.street} {address.number} {address.region} {address.complement}</dd>
                    <dt className="col-sm-1">Bairro</dt>
                    <dd className="col-sm-11">{address.region}</dd>
                    <dt className="col-sm-1">Complemento</dt>
                    <dd className="col-sm-11">{address.complement}</dd>
                    <dt className="col-sm-1">Cidade</dt>
                    <dd className="col-sm-11">{address.city}</dd>
                    <dt className="col-sm-1">Estado</dt>
                    <dd className="col-sm-11">{address.state}</dd>
                    <dt className="col-sm-1">Pais</dt>
                    <dd className="col-sm-11">{address.country}</dd>
                </dl>}
            </Form>

            <h1 className={'mt-5'}>Cálculo</h1>
            <Form onSubmit={formikCalc.handleSubmit}>
                <Form.Group className="mb-3" controlId={"valueA"}>
                    <Form.Label >Valor A</Form.Label>
                    <Form.Control type="number" placeholder="Informe o Valor A" onChange={formikCalc.handleChange}
                                  value={formikCalc.values.valueA} isInvalid={formikCalc.errors.valueA}/>
                    <Form.Control.Feedback type="invalid">{formikCalc.errors.valueA}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={"valueB"}>
                    <Form.Label>Valor B</Form.Label>
                    <Form.Control type="number" placeholder="Informe o Valor B" onChange={formikCalc.handleChange}
                                  value={formikCalc.values.valueB} isInvalid={formikCalc.errors.valueB}/>
                    <Form.Control.Feedback type="invalid">{formikCalc.errors.valueB}</Form.Control.Feedback>
                </Form.Group>
                <Button variant={'primary'} type={"submit"} className={'mt-2'}>Calcular</Button>
            </Form>

            <dl className="row mt-2">
                <dt className="col-sm-1">Média</dt>
                <dd className="col-sm-11">{average}</dd>
            </dl>
        </Container>
    );
}

export default TestForm;
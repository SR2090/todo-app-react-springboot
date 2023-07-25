import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {getTodoByGivenId, updateTodoByGivenId, createTodo} from "./ApiCalloutComponent/ApiCallout";
import { useContextCustomHook } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from "moment/moment";
export default function UpdateComponent() {
    const {id} = useParams();
    const getContext = useContextCustomHook();

    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState("")
    const navigate = useNavigate();

    // to call retrieve todo on load of page
    useEffect(
        () => {
            retrieveTodo();
        },
        [id]
    )

    function retrieveTodo() {
        if(id !== "-1"){
            console.log("VALUE OF " + id);
            getTodoByGivenId(getContext.username, id)
            .then(response => {
                // console.log(response);
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(error => {console.log(error);});
        }
    }

    function onSubmitHandler(values) {
        // console.log("Formik form clicked " + values.description + " " + values.targetDate + " " + getContext.username);
        const todoToBeUpdated = {
            "id": `${id}`,
            "username" : `${getContext.username}`,
            "description" : `${values.description}`,
            "targetDate" : `${values.targetDate}`,
            "done" : false
        }
        console.log(todoToBeUpdated);
        if(id !== "-1"){
            updateTodoByGivenId(getContext.username, id, todoToBeUpdated)
            .then(response => {
                console.log("UPDATE COMPONENT");
                navigate(`/todos`)
            })
            .catch(error => {console.log(error);});
        }else{
            createTodo(getContext.username, todoToBeUpdated)
            .then(response => {
                console.log("CREATE COMPONENT");
                navigate(`/todos`)
            })
            .catch(error => {console.log(error);});
            console.log(id)
        }
    }

    function validateValues(values) {
        const errors = {
            // description : "Enter a valid description",
            // targetDate : "Enter a valid date",
        }

        if(values.description.length < 5) {
            errors.description = "Enter atleast 5 characters"
        }
        if(values.targetDate == null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = "Date cannot be empty"
        }
        return errors;
    }

    return (
        <div className="container">
            {/* <h1 className="welcome-heading">Welcome, <span className="username">{id}</span>!</h1> */}
            <h1>Enter todo details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} }
                enableReinitialize = {true}
                onSubmit={onSubmitHandler}
                validate={validateValues}
                validateOnBlur={false}
                validateOnChange={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                                <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text"  name="description" className="form-control"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" name="targetDate" type="date"></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
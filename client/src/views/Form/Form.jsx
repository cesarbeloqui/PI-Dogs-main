import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import Card from "../../components/Card/Card";
import { getTemperaments } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import axios from "axios";
import InputWithMessage from "../../utils/InputWithMessage/InputWithMessage";
import analyzeString from "../../utils/analyzeString";
import analyzeStringAge from "../../utils/analyzeStringAge";
import CustomDatalist from "../../utils/CustomDatalist/CustomDatalist";
import FileInput from "../../utils/fileInput/fileInput";
import CustomButton from "../../utils/CustomButton/CustomButton";
import checkValueInArray from "../../utils/checkValueInArray";
import Loader from "../../utils/Loader/Loader";
import {SERVER} from "../../redux/actions-type"
const URL_DEFAULT =
"https://res.cloudinary.com/dnrholah3/image/upload/v1690574692/Sin_t%C3%ADtulo_950_924_px_4_phzbov.png";

const dato = {
  id: "dfdkjf",
  image: "https://cdn2.thedogapi.com/images/HkNS3gqEm.jpg",
  name: "Xoloitzcuintli",
  weight: "4 - 14",
  temperament: [
    "Cheerful",
    "Alert",
    "Companionable",
    "Intelligent",
    "Protective",
    "Calm",
  ],
};

const URL_UPLOAD_IMAGE =
  "https://res.cloudinary.com/dnrholah3/image/upload/v1691079950/Dise%C3%B1o_sin_t%C3%ADtulo_3_oongjy.png";

const Form = () => {
  /* 
  {
  id: "",
  image: "",
  name: "",
  height: "",
  weight: "",
  life_span: "",
  temperaments: []
}
  */
  const [formData, setFormData] = useState(
    {
      image: "",
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperament: [],
    } /* {
    image: "",
    name: "",
    weight: "",
    height: "",
    temperament: [],
    life_span: ""
  } */
  );
  //-------------- CAMPO NAME ---------------------
  //-------------- CAMPO NAME ---------------------
  //-------------- CAMPO NAME ---------------------
  const [name, setName] = useState("");

  const [existingNames, setExistingNames] = useState([]);

  const [messageName, setMessageName] = useState("");

  const [validName, setValidName] = useState(null);

  //Manejo del input para el nombre

  const handleNameInput = async (e) => {
    const inputValue = capitalizeFirstLetter(e.target.value);
    setName(inputValue);
    try {
      const response = await axios.get(
        `${SERVER}/dogs/name?name=${inputValue}`
      );
      let valid = true;
      let message = "Nombre valido";
      let existingNames = [];

      if (inputValue.length === 0) {
        valid = false;
        message = "Debe ingresar un nombre";
      } else {
        const foundDogs = response.data;
        if (foundDogs.length === 1 && foundDogs[0].name === inputValue) {
          valid = false;
          message = "Nombre existente";
        } else if (foundDogs.length === 1 && foundDogs[0].name !== inputValue) {
          existingNames = foundDogs.map((dog) => dog.name);
          message = "Existe uno similar, pero igual es valido";
        } else if (foundDogs.length > 1) {
          existingNames = foundDogs.map((dog) => dog.name);
          message = "Esta es una lista de los nombres ya existentes";
        }
      }

      setValidName(valid);
      setMessageName(message);
      setExistingNames(existingNames);

      if (valid) {
        setFormData((state) => {
          return { ...state, name: inputValue };
        });
      } else {
        setFormData((state) => {
          return { ...state, name: "" };
        });
      }
    } catch (error) {
      setValidName(false);
      setMessageName("Debe ingresar un nombre");
      setExistingNames([]);
      setFormData((state) => {
        return { ...state, name: "" };
      });
    }
  };

  //-------------- CAMPO HEIGHT -------------------
  //-------------- CAMPO HEIGHT -------------------
  //-------------- CAMPO HEIGHT -------------------

  const [height, setHeight] = useState("");
  const [messageHeight, setMessageHeight] = useState("");
  const [validHeight, setValidHeight] = useState(null);
  const handleHeightInput = (e) => {
    const { string, valid, message } = analyzeString(e.target.value);
    setValidHeight(valid);
    setHeight(string);
    setMessageHeight(message);
    validHeight
      ? setFormData((state) => ({
          ...state,
          height: string,
        }))
      : setFormData((state) => ({
          ...state,
          height: "",
        }));
  };
  //-------------- CAMPO PESO -------------------
  //-------------- CAMPO PESO -------------------
  //-------------- CAMPO PESO -------------------

  const [weight, setWeight] = useState("");
  const [messageWeight, setMessageWeight] = useState("");
  const [validWeight, setValidWeight] = useState(null);
  const handleWeightInput = (e) => {
    const { string, valid, message } = analyzeString(e.target.value);
    setValidWeight(valid);
    setWeight(string);
    setMessageWeight(message);
    validWeight &&
      setFormData((state) => ({
        ...state,
        weight: string,
      }));
  };
  //-------------- CAMPO AÑOS DE VIDA-----------------
  //-------------- CAMPO AÑOS DE VIDA-----------------
  //-------------- CAMPO AÑOS DE VIDA-----------------

  const [lifeSpan, setLifeSpan] = useState("");
  const [messageLifeSpan, setMessageLifeSpan] = useState("");
  const [validLifeSpan, setValidLifeSpan] = useState(null);
  const handleLifeSpanInput = (e) => {
    const { string, valid, message } = analyzeStringAge(e.target.value);
    setValidLifeSpan(valid);
    setLifeSpan(string);
    setMessageLifeSpan(message);
    validLifeSpan &&
      setFormData((state) => ({
        ...state,
        life_span: string,
      }));
  };

  //----- CAMPO TEMPERAMENTS -------------------
  //----- CAMPO TEMPERAMENTS -------------------
  //----- CAMPO TEMPERAMENTS -------------------

  // Función para manejar la selección de un temperamento desde el input
  //pone en el estado global los temperamentos
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //trae del estado global los temperamentos
  const dataList = useSelector((state) => state.temperaments);

  const [validTemperaments, setValidTemperaments] = useState(null);

  const handleTemperamentChange = (selectedTemperament) => {
    !checkValueInArray(formData.temperament, selectedTemperament) &&
      setFormData((state) => ({
        ...state,
        temperament: [...formData.temperament, selectedTemperament],
      }));
    setValidTemperaments(true);
  };

  // Función para eliminar un temperamento del array de seleccionados
  const handleRemoveTemperament = (index) => {
    const updatedTemperaments = [...formData.temperament];
    updatedTemperaments.splice(index, 1); // Eliminar 1 elemento en el índice especificado
    setFormData((state) => {
      const newState = { ...state, temperament: updatedTemperaments };
      setValidTemperaments(updatedTemperaments.length > 0); // Verificar aquí dentro del callback
      return newState;
    });
  };

  //-------------- CAMPO UPLOAD -------------------
  //-------------- CAMPO UPLOAD -------------------
  //-------------- CAMPO UPLOAD -------------------

  const URL_API_IMAGE =
    "https://api.cloudinary.com/v1_1/dnrholah3/image/upload";
  const [validImage, setValidImage] = useState(null);
  const updateDataUrl = (url) => {
    // Modificar solo la propiedad "image" del estado compartido del padre
    setFormData((prevState) => ({
      ...prevState,
      image: url,
    }));
    setValidImage(true);
  };
  //-------------- VALIDATION -------------------
  //-------------- VALIDATION -------------------
  //-------------- VALIDATION -------------------
  const [validForm, setValidForm] = useState(false);
  const [listValid, setListValid] = useState([]); // Estado para almacenar la lista de campos inválidos

  // Función para obtener la lista de campos inválidos
  const getInvalidFields = () => {
    const invalidFields = [];
    if (!validImage) invalidFields.push("Imagen");
    if (!validName) invalidFields.push("Nombre");
    if (!validHeight) invalidFields.push("Altura");
    if (!validWeight) invalidFields.push("Peso");
    if (!validLifeSpan) invalidFields.push("Años de vida");
    if (!validTemperaments) invalidFields.push("Temperaments");
    return invalidFields;
  };

  useEffect(() => {
    // Obtener la lista de campos inválidos
    const invalidFields = getInvalidFields();
    // Actualizar el estado de validForm
    const isValidForm = invalidFields.length === 0;
    setValidForm(isValidForm);

    // Actualizar el estado de listValid
    setListValid(invalidFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    validImage,
    validName,
    validHeight,
    validWeight,
    validLifeSpan,
    validTemperaments,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [submit, setSubmit] = useState("Submit");
  const handleSubmitForm = (e) => {
    setIsLoading(true);
    axios
      .post(`${SERVER}/dogs`, formData)
      .then((response) => {
        // Petición exitosa
        setIsLoading(false);
        setSubmit("Enviado");
        setTimeout(() => {
          setFormData((_prevState) => ({
            image: "",
            name: "",
            height: "",
            weight: "",
            life_span: "",
            temperament: [],
          }));
          setName("");
          setHeight("");
          setWeight("");
          setLifeSpan("");
          setSubmit("Submit");
        }, 5000);
      })
      .catch((error) => {
        // Manejo de errores en la petición
        console.log(error);
        setIsLoading(false);
        setSubmit("Error al enviar");
        setTimeout(() => {
          setSubmit("Submit");
        }, 5000);
      });
  };

  return (
    <div className={style.container}>
      <form>
        <div className={style.cardContainer}>
          <Card
            id={dato.id}
            key={dato.id}
            image={formData.image ? formData.image : URL_DEFAULT}
            name={formData.name || dato.name}
            weight={formData.weight || dato.weight}
            temperament={
              formData.temperament.length !== 0
                ? formData.temperament
                : dato.temperament
            }
          />
        </div>

        <div className={style.containerForm}>
          <FileInput
            URL_UPLOAD_IMAGE={URL_UPLOAD_IMAGE}
            URL_API_IMAGE={URL_API_IMAGE}
            updateDataUrl={updateDataUrl}
          />
          <div className={style.containerInputs}>
            <div>
              <label>Nombre</label>
            </div>
            <div>
              <InputWithMessage
                type="text"
                value={name}
                onChange={handleNameInput}
                placeholder="Nombre"
                Message={
                  validName !== null ? (
                    <>
                      <p>{messageName}</p>
                      {existingNames.length !== 0 && name !== "" && (
                        <ul>
                          {existingNames.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    messageName
                  )
                }
                valid={validName}
              />
              {/* Mostrar advertencia si el nombre es inválido */}
            </div>
            <div>
              <label>Altura</label>
            </div>
            <div>
              <InputWithMessage
                type="text"
                value={height}
                onChange={handleHeightInput}
                placeholder="Altura"
                Message={messageHeight}
                valid={validHeight}
              />
            </div>
            <div>
              <label>Peso</label>
            </div>
            <div>
              <InputWithMessage
                type="text"
                value={weight}
                onChange={handleWeightInput}
                placeholder="Peso"
                Message={messageWeight}
                valid={validWeight}
              />
            </div>
            <div>
              <label>Años de vida</label>
            </div>
            <div>
              <InputWithMessage
                type="text"
                value={lifeSpan}
                onChange={handleLifeSpanInput}
                placeholder="Años de vida"
                Message={messageLifeSpan}
                valid={validLifeSpan}
              />
            </div>
            <div>
              <label>Temperamentos</label>
            </div>
            <div>
              <CustomDatalist
                options={dataList}
                onChange={handleTemperamentChange}
                placeholder="Temperamentos"
              />
            </div>
            <div>
              {/* Renderizar los temperamentos seleccionados como botones */}
              {formData.temperament.map((temperament, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleRemoveTemperament(index)}
                >
                  {temperament}
                </button>
              ))}
            </div>
            <div>
              <CustomButton
                value={validForm}
                onChange={handleSubmitForm}
                disabledMessage={
                  validForm
                    ? ""
                    : `Faltan completar los campos ${listValid.join(", ")}`
                }
                buttonText={isLoading ? <Loader /> : submit}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

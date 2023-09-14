const validate = (state, name, error, setError) => {
  const lettersRegex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
  const urlRegex =
    /^(https?:\/\/|www\.)[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  const validExtensions = ["jpg", "jpeg", "gif", "png"]; // Lista de extensiones válidas

  if (name === "name" || name === "lastname") {
    if (state[name].trim() === "") {
      setError({ ...error, [name]: "Campo requerido" });
    } else if (!lettersRegex.test(state[name])) {
      setError({ ...error, [name]: "Este campo solo puede contener letras" });
    } else if (state[name].trim().length < 2) {
      setError({ ...error, [name]: "Debe tener al menos 2 caracteres" });
    } else {
      setError({ ...error, [name]: "" });
    }
  } else if (name === "description") {
    if (state.description.trim() === "") {
      setError({ ...error, description: "Campo requerido" });
    } else if (state.description.trim().length < 9) {
      setError({ ...error, description: "Debe tener al menos 10 caracteres" });
    } else {
      setError({ ...error, description: "" });
    }
  } else if (name === "image") {
    if (state.image.trim() === "") {
      setError({ ...error, image: "Campo requerido" });
    } else if (!urlRegex.test(state.image.trim())) {
      setError({
        ...error,
        image: "URL inválida",
      });
    } else {
      // La URL es válida, ahora verificar la extensión del archivo
      const urlParts = state.image.split(".");
      const extension = urlParts[urlParts.length - 1].toLowerCase();

      if (!validExtensions.includes(extension)) {
        setError({
          ...error,
          image: "La extensión debe ser .jpg, .jpeg, .gif o .png",
        });
      } else {
        setError({ ...error, image: "" });
      }
    }
  } else if (name === "nationality") {
    if (state.nationality.trim() === "") {
      setError({ ...error, nationality: "Campo requerido" });
    } else if (!lettersRegex.test(state.nationality)) {
      setError({
        ...error,
        nationality: "Este campo solo puede contener letras",
      });
    } else if (state.nationality.trim().length < 4) {
      setError({ ...error, nationality: "Debe tener al menos 4 caracteres" });
    } else {
      setError({ ...error, nationality: "" });
    }
  } else if (name === "dob") {
    const dateParts = state.dob.split("-");
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);

      const currentDate = new Date();
      const minYear = currentDate.getFullYear() - 200;
      const maxYear = currentDate.getFullYear();

      if (
        !(
          year >= minYear &&
          year <= maxYear &&
          month >= 1 &&
          month <= 12 &&
          day >= 1 &&
          day <= new Date(year, month, 0).getDate()
        )
      ) {
        setError({
          ...error,
          dob: "Fecha de nacimiento no válida. Debe estar en el formato AAAA-MM-DD y ser una fecha válida.",
        });
      } else {
        setError({ ...error, dob: "" });
      }
    } else {
      setError({
        ...error,
        dob: "Formato de fecha no válido. Debe estar en el formato AAAA-MM-DD.",
      });
    }
  } else if (name === "teams") {
    if (state.teams.length === 0) {
      setError({
        ...error,
        teams: "Debes agregar al menos una Escudería",
      });
    } else {
      setError({ ...error, teams: "" });
    }
  }
};

export default validate;

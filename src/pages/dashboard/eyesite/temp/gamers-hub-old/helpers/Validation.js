export const validateNameHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value.trim() === "") {
    data.isError = true;
    data.message = "Name cannot be blank";
  }
  if (value.length > 255) {
    data.isError = true;
    data.message = "Name cannot be more than 255 characters";
  }
  return data;
};

export const validateNickNameHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value !== null && value !== undefined && value.length > 255) {
    data.isError = true;
    data.message = "Nick Name cannot be more than 255 characters";
  }
  return data;
};

export const validateLinkHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value !== null && value !== undefined && value.trim() === "") {
    data.isError = true;
    data.message = "Link cannot be blank";
  }
  return data;
};

export const validateDescriptionHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value.trim() === "") {
    data.isError = true;
    data.message = "Description cannot be blank";
  } else if (value.length > 1000) {
    data.isError = true;
    data.message = "Description cannot be more than 1000 characters";
  }
  return data;
};

export const validateBestReviewHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value.length > 1000) {
    data.isError = true;
    data.message = "Best review cannot be more than 1000 characters";
  }
  return data;
};

export const validatePhotoHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value === null || value === undefined) {
    data.isError = true;
    data.message = "Photo is required";
  } else if (!value.type.match("image.*")) {
    data.isError = true;
    data.message = "Only JPG, JPEG or PNG Allowed";
  }
  return data;
};

export const validateEditPhotoHelper = (value) => {
  let data = {
    value: value,
    message: "",
    isError: false,
    isPristine: false,
  };
  if (value !== null && value !== undefined) {
    if (!value.type.match("image.*")) {
      data.isError = true;
      data.message = "Only JPG, JPEG or PNG Allowed";
    }
  }
  return data;
};

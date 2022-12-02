const ObjectDifference = (obj1, obj2) => {
    let updatedFields = [];
    Object.keys(obj1).forEach((key) => {
      if (obj1[key] !== obj2[key]) {
        updatedFields.push(obj1[key]);
      }
    });
    return updatedFields;
  };

export default ObjectDifference;
export const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = key => {
  return JSON.parse(localStorage.getItem(key));
};

class Storage {
  constructor(keyName, defaultValue) {
    this.keyName = keyName;

    if (!this.exist() && defaultValue) {
      this.save(defaultValue);
    }
  }

  save(data) {
    setItem(this.keyName, data);
  }

  load() {
    return getItem(this.keyName);
  }

  exist() {
    return getItem(this.keyName) ? true : false;
  }

  existById(id) {
    return getItem(this.keyName).find(v => v.id === id) ? true : false;
  }

  push(item) {
    const loadedData = this.load() ?? [];

    if (!Array.isArray(loadedData)) {
      console.error('You can push only on Array');
      return;
    }

    if (!this.existById(item.id)) {
      loadedData.push(item);
      this.save(loadedData);

      return;
    }

    this.save(loadedData.map(v => (v.id === item.id ? item : v)));
  }




}

export default Storage;

const AirtablePlus = require("airtable-plus");
import { uuidV4 } from "../utils/uuid";
import { get } from "lodash";
import restClientService from "./rest-client.service";

const categoriesDemoData = [
  {
    id: "1",
    name: "Đồ ăn",
  },
  {
    id: "2",
    name: "Đồ uống",
  },
  {
    id: "3",
    name: "Đồ ăn kèm",
  },
];

const demoData = [
  {
    id: "1",
    name: "Đồ ăn",
    products: [
      {
        id: "1.1",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
      {
        id: "1.2",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
      {
        id: "1.3",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
    ],
  },
  {
    id: "2",
    name: "Đồ uống",
    products: [
      {
        id: "2.1",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
      {
        id: "2.2",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
      {
        id: "2.3",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
    ],
  },
  {
    id: "3",
    name: "Đồ ăn kèm",
    products: [
      {
        id: "3.1",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
      {
        id: "3.2",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
      {
        id: "3.3",
        name: "Cold Brew Cam Vàng thơm ngon khó cưỡng",
        picture: "/assets/img/product.png",
        price: 10000,
        description:
          "Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu Arabica Cầu Arabica Cầu)",
      },
    ],
  },
];

const selectionsDemoData = [
  {
    id: "1",
    name: "Nhom tuy chon 1",
    options: [],
    singleSelection: true,
  },
  {
    id: "2",
    name: "Nhom tuy chon 2",
    options: [],
    singleSelection: false,
  },
];

class ProductService {
  constructor() {
    process.env.NEXT_PUBLIC_AIR_TABLE_API_KEY &&
      (this.airtablePRODUCT = new AirtablePlus({
        baseID: process.env.NEXT_PUBLIC_AIR_TABLE_BASE_ID_PRODUCT,
        apiKey: process.env.NEXT_PUBLIC_AIR_TABLE_API_KEY,
      }));
  }

  createProductSample() {
    return {
      id: null,
      name: "",
      description: "",
      price: 0,
      categoryId: null,
      selections: [],
      image: null,
      enable: true,
    };
  }

  _convertCategoryFromServer(category) {
    return {
      id: category.id,
      name: category.name,
      products: [],
    };
  }

  _revertCategoryFromClient(category) {
    return {
      id: category.id,
      name: category.name,
    };
  }

  _convertProductFromServer(product) {
    return {
      id: product.id,
      name: product.nameVi,
      price: product.price,
      description: product.description,
      image: product.photoUrl,
      selections: [],
      enable: product.avaiable,
      categoryId: product.belongToCategory.id,
    };
  }

  _revertProductFromClient(product) {
    return {
      id: product.id,
      nameVi: product.name,
      price: product.price,
      description: product.description,
      photoUrl: product.image,
      avaiable: product.enable,
      categoryId: product.categoryId,
    };
  }

  async getCategoriesWithProduct() {
    console.log("getCategoriesWithProduct");
    const categories = await this.getCategories();
    const products = await this.getProducts();

    console.log("categories", categories);
    console.log("products", products);

    for (const product of products) {
      const category = categories.find(
        (category) => category.id === product.categoryId
      );
      category && category.products.push(product);
    }
    return categories;
  }

  async getCategories() {
    return restClientService.asyncGet("/category").then(({ status, data }) => {
      if (status === 200) {
        return (data || []).map((category) =>
          this._convertCategoryFromServer(category)
        );
      } else {
        return [];
      }
    });
  }

  async getProductOfCategory(id) {
    return demoData.find((category) => category.id === id)?.products || [];
  }

  async getProducts() {
    return restClientService.asyncGet("/product").then(({ status, data }) => {
      if (status === 200) {
        return (data || []).map((product) =>
          this._convertProductFromServer(product)
        );
      } else {
        return [];
      }
    });
    // return this.airtablePRODUCT
    //   .read(
    //     { filterByFormula: `'ProductBrand = ${+brandId}'` },
    //     { tableName: "Product" }
    //   )
    //   .then((items) =>
    //     items.map((item) => ({
    //       id: item.fields.ID,
    //       recId: item.recID,
    //       name: item.fields.name,
    //       price: item.fields.price,
    //       description: item.fields.description,
    //       categoryId: get(item.fields, ["categoryId", 0]),
    //       image: get(item.fields, ["attachments", 0, "url"]) || null,
    //       enable: item.fields.enable || false,
    //     }))
    //   );
  }

  async getSelections() {
    return selectionsDemoData;
  }

  saveCategories(categories = []) {
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  async createCategory(category) {
    console.log("create category", category);
    return restClientService
      .asyncPost("/category", category)
      .then(({ status, data }) => {
        if (status === 201) {
          console.log("data", data);
          return this._convertCategoryFromServer(data);
        }

        return null;
      });
  }

  async updateCategory(categoryId, category) {
    return restClientService
      .asyncPut(`/category/${categoryId}`, category)
      .then(({ status, data }) => {
        if (status === 200) {
          return this._convertCategoryFromServer(data);
        }
        return null;
      });
  }

  async createProduct(categoryId, product) {
    return restClientService
      .asyncPost(`/product`, {
        ...product,
        categoryId,
      })
      .then(({ status, data }) => {
        if (status === 201) {
          return this._convertProductFromServer(data);
        }

        return null;
      });
  }

  async updateProduct(id, product) {
    return { ...product, id };
  }
}

export default new ProductService();

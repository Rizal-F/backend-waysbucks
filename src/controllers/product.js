const { product, user } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      // include: [
      //   {
      //     model: user,
      //     as: "user",
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt", "password"],
      //     },
      //   },
      // ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return{
        ...item,
        image: process.env.FILE_PATH + item.image
      }
    }) 

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { data } = req.body;
    
    // code here
    let newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
      title: req.body.title,
      price: req.body.price
    })

    newProduct = JSON.parse(JSON.stringify(newProduct))

    newProduct = {
      ...newProduct,
      image: process.env.FILE_PATH + newProduct.image
    }

    res.status(201).send({
      status: 'success',
      data: {
        newProduct
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await product.findOne({
      where: {
        id,
      },
      // include: [
      //   {
      //     model: user,
      //     as: "user",
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt", "password"],
      //     },
      //   },
      // ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"]
      },
    });

    res.send({
      status: "success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.update(req.body, {
      where: {
        id,
      },

    });

    res.send({
      status: "success",
      data: req.body,
    });
    
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: { id },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
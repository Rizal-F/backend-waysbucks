const { topping, user } = require("../../models");

exports.getToppings = async (req, res) => {
  try {
    const data = await topping.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

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

exports.addTopping = async (req, res) => {
  try {
    const { data } = req.body;
    
    // code here
    let newTopping = await topping.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
      title: req.body.title,
      price: req.body.price
    })

    newTopping = JSON.parse(JSON.stringify(newTopping))

    newTopping = {
      ...newTopping,
      image: process.env.FILE_PATH + newTopping.image
    }

    res.status(201).send({
      status: 'success',
      data: {
        newTopping
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

exports.getTopping = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await topping.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
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

exports.updateTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.update(req.body, {
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

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.destroy({
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
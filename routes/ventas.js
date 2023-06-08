const express = require("express");
const router = express.Router();

// Importar los modelos de Sequelize
const db = require("../base-orm/sequelize-init");

// Ruta para crear una venta con sus detalles
router.post("/api/ventas", async (req, res) => {
  const { IdCliente, Fecha, Total, VentasDetalles } = req.body;

  // Iniciar la transacción
  const t = await db.sequelize.transaction();

  try {
    // Crear la venta
    const venta = await db.Ventas.create(
      {
        //IdVenta,  // No se pasa el IdVenta porque es autoincremental
        IdCliente,
        Fecha,
        Total,
      },
      { transaction: t }
    );

    // Crear los detalles de la venta
    const detallesPromises = VentasDetalles.map((detalle) => {
      return db.VentasDetalles.create(
        {
          IdVenta: venta.IdVenta, 
          IdArticulo: detalle.IdArticulo,
          Cantidad: detalle.Cantidad,
          Precio: detalle.Precio,
        },
        { transaction: t }
      );
    });

    // Esperar a que se completen todas las creaciones de los detalles
    await Promise.all(detallesPromises);

    // Confirmar la transacción
    await t.commit();

    res.status(201).json({ message: "Venta creada exitosamente" });
  } catch (error) {
    console.error("Error al crear la venta:", error);

    // Si ocurre algún error, deshacer la transacción
    await t.rollback();

    res.status(500).json({ message: "Error al crear la venta" });
  }
});

// Ruta para obtener todas las ventas con sus detalles
router.get("/api/ventas", async (req, res) => {
  try {
    const ventas = await db.Ventas.findAll({
      include: db.VentasDetalles,
    });

    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
});

module.exports = router;

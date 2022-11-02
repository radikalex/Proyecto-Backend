'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'NZXT Function Mini TKL Mechanical Keyboard',
        price: 99.99,
        description: 'MECHANICAL KEYBOARD: The NZXT Function mechanical keyboard family combines a durable aluminum top plate with smooth, linear RGB switches, making it the perfect companion for PC gaming',
        img_product: 'default/seeder-product1.jpg',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MSI Ventus GeForce RTX 3080 12GB GDDR6X PCI Express 4.0',
        price: 789.99,
        description: '12GB 384-Bit GDDR6X - Boost Clock 1740 MHz - 1 x HDMI 2.1 3 x DisplayPort 1.4a - 8960 CUDA Cores - PCI Express 4.0',
        img_product: 'default/seeder-product2.jpg',
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xbox Elite Wireless Series 2 Controller Black',
        price: 179.99,
        description: 'Use Xbox Wireless, Bluetooth, or the included USB-C cable to play across your Xbox One and Windows 10 devices',
        img_product: 'default/seeder-product3.jpg',
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'NETGEAR Nighthawk Pro Gaming 6-Stream WiFi 6 Router AX5400 (XR1000)',
        price: 369.99,
        description: 'Powered by DumaOS 3.0: Reduce ping rates up to 93% and enjoy faster, lag-free online gaming and smoother streaming with this Router OS built especially for gamers',
        img_product: 'default/seeder-product4.jpg',
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Microsoft Windows 11 Pro 64-bit, DVD - OEM',
        price: 159.98,
        description: 'Windows 11 has easy-to-use tools that can help you optimize your screen space and maximize your productivity',
        img_product: 'default/seeder-product5.jpg',
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ASUS VivoBook Pro 16X OLED Laptop, 16" WQUXGA',
        price: 999.99,
        description: '16" WQUXGA 16:10 Display, Intel Core i7-11370H CPU, NVIDIA GeForce RTX 3050, 16GB RAM, 1TB SSD, Windows 11 Pro, DialPad, Comet Grey, N7600PC-NB74',
        img_product: 'default/seeder-product6.jpg',
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MSI PRO PRO X670-PA',
        price: 289.99,
        description: 'WIFI DDR5 AM5 AMD Ryzen™ 7000 Series SATA 6Gb/s ATX Motherboards, Wi-Fi 6E, 2.5G Network Solution, Frozr AI Cooling',
        img_product: 'default/seeder-product7.jpg',
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Thrustmaster T248 Racing Wheel (PS5, PS4 and PC)',
        price: 399.99,
        description: "T248: Thrustmaster's hybrid next generation of racing simulation for PS5/PS4 and PC",
        img_product: 'default/seeder-product8.jpg',
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {}
};
CREATE DATABASE IF NOT EXISTS travel ;

USE travel ;

DROP TABLE IF EXISTS customers;

CREATE TABLE
    customers (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        firstname NVARCHAR (100) NOT NULL,
        lastname NVARCHAR (100) NOT NULL,
        mailAdress VARCHAR (100) NOT NULL
    );

INSERT INTO
    customers (
        id,
        firstname,
        lastname,
        mailAdress
    )
VALUES (
        1,
        "Alexandre",
        "Rouxel",
        "alexandrerouxel@mail.com"
    ), (
        2,
        "Amina",
        "Hakimi",
        "aminahakimi@mail.com"
    ), (
        3,
        "Charlie",
        "Piancatelli",
        "charliepiancatelli@mail.com"
    ), (
        4,
        "Christopher",
        "Guichard",
        "christopherguichard@mail.com"
    ), (
        5,
        "Emmanuel",
        "Martinez",
        "emmanuelmartinez@mail.com"
    ), (
        6,
        N "Gaëtan",
        "Lemoine",
        "gaetanlemoine@mail.com"
    ), (
        7,
        "Guillaume",
        "Wernert",
        "guillaumewernert@mail.com"
    ), (
        8,
        "Jordan",
        "Vaxelaire",
        "jordanvaxelaire@mail.com"
    ), (
        9,
        "Karim",
        "Aoudia",
        "karimaoudia@mail.com"
    ), (
        10,
        "Sylvain",
        "Tormo",
        "sylvaintormo@mail.com"
    ), (
        11,
        N "Sébastien",
        "Petaccia",
        "sebastienpetaccia@mail.com"
    ), (
        12,
        "Tsiry",
        "Ralambotsirofo",
        "tsiryralambotsirofo@mail.com"
    ), (
        13,
        "Vassili",
        "Papadopoulos",
        "vassilipapadopoulos@mail.com"
    ), (
        14,
        "Yanis",
        "Viot",
        "yanisviot@mail.com"
    );

DROP TABLE IF EXISTS stay;

CREATE TABLE
    stay (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        country VARCHAR (100) NOT NULL,
        departureDate VARCHAR (100) NOT NULL,
        returnDate VARCHAR (100) NOT NULL,
        price VARCHAR (100) NOT NULL
    );

INSERT INTO
    stay (
        id,
        country,
        departureDate,
        returnDate,
        price
    )
VALUES (
        1,
        "Maldives",
        "15/01/2023",
        "07/02/2023",
        "2.568$"
    ), (
        2,
        "Kenya",
        "04/01/2023",
        "22/01/2023",
        "1.897$"
    ), (
        3,
        "Seychelles",
        "09/01/2023",
        "02/02/2023",
        "2.354$"
    ), (
        4,
        "Bali",
        "19/01/2023",
        "09/02/2023",
        "1.438$"
    ), (
        5,
        "Vietnam",
        "06/01/2023",
        "24/01/2023",
        "1.918$"
    );

DROP TABLE IF EXISTS booking;

CREATE TABLE
    booking (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        customers_id INT NOT NULL,
        CONSTRAINT fk_booking_customers FOREIGN KEY (customers_id) REFERENCES customers(id),
        stay_id INT NOT NULL,
        CONSTRAINT fk_booking_stay FOREIGN KEY (stay_id) REFERENCES stay(id),
        bookingDate VARCHAR (100) NOT NULL
    );

INSERT INTO
    booking (
        id,
        customers_id,
        stay_id,
        bookingDate
    )
VALUES (1, 11, 3, "24/11/2022"), (2, 14, 5, "05/10/2022"), (3, 2, 1, "15/11/2022"), (4, 10, 3, "18/09/2022"), (5, 9, 1, "08/12/2022"), (6, 7, 3, "11/10/2022"), (7, 12, 4, "25/11/2022"), (8, 14, 4, "11/09/2022"), (9, 4, 2, "25/10/2022"), (10, 3, 5, "20/11/2022");

SELECT
    firstname,
    lastname,
    country,
    departureDate
FROM customers
    INNER JOIN booking ON customers.id = booking.customers_id
    INNER JOIN booking ON stay.id = booking.stay_id
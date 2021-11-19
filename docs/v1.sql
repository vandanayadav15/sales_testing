
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

create table sales_orders(
    id uuid NOT null,
    invoice_id varchar(63),
    order_date DATE NOT null,
    quantity varchar(63),
    discount varchar(63),
    tax_amount DECIMAL (19, 2) default 0.0,
    tax_percentage DECIMAL (19, 2) default 0.0,
    amount DECIMAL (19, 2) default '0.0',
    active bool NOT NULL DEFAULT true,
    created_by varchar(127) NOT NULL DEFAULT 'system',
    created_on timestamp NOT NULL DEFAULT now(),
    updated_by varchar(127) NOT NULL DEFAULT 'system',
    updated_on timestamp NOT NULL DEFAULT now(),
    CONSTRAINT sales_orders_pkey PRIMARY KEY (id)
); 

create table sales_items(
    id uuid NOT null,
    item_list_id uuid,
    sales_orders_id uuid,
    price varchar(127),
    quantity varchar(127),
    discount varchar(63),
    tax_percentage DECIMAL (19, 2) default 0.0,
    tax_amount DECIMAL (19, 2) default 0.0,
    amount DECIMAL (19, 2) default 0.0,
    active bool NOT NULL DEFAULT true,
    created_by varchar(127) NOT NULL DEFAULT 'system',
    created_on timestamp NOT NULL DEFAULT now(),
    updated_by varchar(127) NOT NULL DEFAULT 'system',
    updated_on timestamp NOT NULL DEFAULT now(),
    CONSTRAINT sales_items_pkey PRIMARY KEY (id)
);

CREATE TABLE item_list (
	id uuid NOT NULL,
	name varchar(127) NULL,
	brand varchar(127) NULL,
	default_price varchar(50) NULL,
	description varchar(127) NULL,
	created_by varchar(127) NOT NULL DEFAULT 'system'::character varying,
	created_on timestamp NOT NULL DEFAULT now(),
	updated_by varchar(127) NOT NULL DEFAULT 'system'::character varying,
	updated_on timestamp NOT NULL DEFAULT now(),
	active bool NOT NULL DEFAULT true,
	CONSTRAINT item_list_pkey PRIMARY KEY (id)
);


alter table sales_items add constraint sales_items_fk_sales_orders_id foreign key (sales_orders_id) references sales_orders(id);
alter table sales_items add constraint sales_items_fk_item_list_id foreign key (item_list_id) references item_list(id);

----------------
create table purchase_invoice(
    id uuid NOT null,
    company_name varchar(127)NOT NULL,
    bill_to varchar(127)NOT NULL,
    price varchar(127)NOT NULL,
    quantity varchar(127)NOT NULL,
    discount varchar(63),
    tax_percentage DECIMAL (19, 2) default 0.0,
    tax_amount DECIMAL (19, 2) default 0.0,
    total_amount DECIMAL (19, 2) default 0.0 NOT NULL,
    active bool NOT NULL DEFAULT true,
    created_by varchar(127) NOT NULL DEFAULT 'system',
    created_on timestamp NOT NULL DEFAULT now(),
    updated_by varchar(127) NOT NULL DEFAULT 'system',
    updated_on timestamp NOT NULL DEFAULT now(),
    CONSTRAINT purchase_invoice_pkey PRIMARY KEY (id)
);


create table purchase_item(
    id uuid NOT null,
    stock_item_id uuid NOT null ,
    purchase_invoice_id uuid NOT null,
    price varchar(127)NOT null,
    quantity varchar(127)NOT null,
    discount varchar(63),
    tax_percentage DECIMAL (19, 2) default 0.0,
    tax_amount DECIMAL (19, 2) default 0.0,
    amount DECIMAL (19, 2) default 0.0 NOT null,
    active bool NOT NULL DEFAULT true,
    created_by varchar(127) NOT NULL DEFAULT 'system',
    created_on timestamp NOT NULL DEFAULT now(),
    updated_by varchar(127) NOT NULL DEFAULT 'system',
    updated_on timestamp NOT NULL DEFAULT now(),
    CONSTRAINT purchase_orders_pkey PRIMARY KEY (id)
);

CREATE TABLE stock_item(
	id uuid NOT NULL,
	name varchar(127) NOT NULL,
	brand varchar(127) NULL,
	default_price varchar(50) NOT NULL,
	description varchar(127) NULL,
	created_by varchar(127) NOT NULL DEFAULT 'system'::character varying,
	created_on timestamp NOT NULL DEFAULT now(),
	updated_by varchar(127) NOT NULL DEFAULT 'system'::character varying,
	updated_on timestamp NOT NULL DEFAULT now(),
	active bool NOT NULL DEFAULT true,
	CONSTRAINT stock_item_pkey PRIMARY KEY (id)
);

alter table purchase_item add constraint purchase_item_fk_purchase_invoice_id foreign key (purchase_invoice_id) references purchase_invoice(id);
alter table purchase_item add constraint purchase_item_fk_stock_item_id foreign key (stock_item_id) references stock_item(id);

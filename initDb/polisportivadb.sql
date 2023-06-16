--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1 (Debian 11.1-3.pgdg90+1)
-- Dumped by pg_dump version 11.1 (Debian 11.1-3.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: address; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.address (
    id integer NOT NULL,
    state character varying(255),
    city character varying(255),
    street_name character varying(255),
    street_number character varying(255),
    postcode character varying(255)
);


ALTER TABLE public.address OWNER TO admin;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO admin;

--
-- Name: price_list; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.price_list (
    id integer NOT NULL,
    price_per_hour double precision
);


ALTER TABLE public.price_list OWNER TO admin;

--
-- Name: reservation; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reservation (
    id integer NOT NULL,
    sports_field_id integer,
    owner_id integer,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    state character varying(10),
    price double precision
);


ALTER TABLE public.reservation OWNER TO admin;

--
-- Name: reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_id_seq OWNER TO admin;

--
-- Name: reservation_rating; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reservation_rating (
    id integer NOT NULL,
    rating double precision,
    description character varying(250),
    reservation_id integer
);


ALTER TABLE public.reservation_rating OWNER TO admin;

--
-- Name: reservation_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservation_rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_rating_id_seq OWNER TO admin;

--
-- Name: reservations_summary; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reservations_summary (
    id integer NOT NULL,
    sports_facility_id integer,
    sports_facility_name character varying(25),
    description character varying(150),
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    created_at timestamp without time zone
);


ALTER TABLE public.reservations_summary OWNER TO admin;

--
-- Name: reservations_summary_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservations_summary_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_summary_id_seq OWNER TO admin;

--
-- Name: reservations_summary_id_seq1; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservations_summary_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_summary_id_seq1 OWNER TO admin;

--
-- Name: reservations_summary_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reservations_summary_id_seq1 OWNED BY public.reservations_summary.id;


--
-- Name: sports_facility; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.sports_facility (
    id integer NOT NULL,
    owner_id integer,
    name character varying(25),
    total_sports_fields integer,
    address_id integer,
    phone character varying
);


ALTER TABLE public.sports_facility OWNER TO admin;

--
-- Name: sports_facility_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.sports_facility_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sports_facility_id_seq OWNER TO admin;

--
-- Name: sports_field; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.sports_field (
    id integer NOT NULL,
    sports_facility_id integer,
    name character varying(25),
    sport character varying(25),
    is_indoor boolean,
    owner_id integer,
    price_list_id integer,
    soccer_field_type character varying(25),
    tennis_field_type character varying(25)
);


ALTER TABLE public.sports_field OWNER TO admin;

--
-- Name: sports_field_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.sports_field_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sports_field_id_seq OWNER TO admin;

--
-- Name: sports_field_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.sports_field_id_seq OWNED BY public.sports_field.id;


--
-- Name: sports_field_price_list_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.sports_field_price_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sports_field_price_list_id_seq OWNER TO admin;

--
-- Name: sports_reservation_report; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.sports_reservation_report (
    id integer NOT NULL,
    total_reservations integer,
    sport character varying(15),
    total_revenue double precision,
    rejected_reservations integer,
    pending_reservations integer,
    accepted_reservations integer,
    id_reservations_summary integer
);


ALTER TABLE public.sports_reservation_report OWNER TO admin;

--
-- Name: sports_reservation_report_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.sports_reservation_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sports_reservation_report_id_seq OWNER TO admin;

--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user (
    id integer NOT NULL,
    username character varying(255),
    password character varying(128),
    address_id integer,
    email character varying(50),
    first_name character varying(25),
    last_name character varying(25),
    fiscal_code character varying(25)
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO admin;

--
-- Name: reservations_summary id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations_summary ALTER COLUMN id SET DEFAULT nextval('public.reservations_summary_id_seq1'::regclass);


--
-- Name: sports_field id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_field ALTER COLUMN id SET DEFAULT nextval('public.sports_field_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.address (id, state, city, street_name, street_number, postcode) FROM stdin;
\.


--
-- Data for Name: price_list; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.price_list (id, price_per_hour) FROM stdin;
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reservation (id, sports_field_id, owner_id, start_date, end_date, created_at, state, price) FROM stdin;
\.


--
-- Data for Name: reservation_rating; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reservation_rating (id, rating, description, reservation_id) FROM stdin;
\.


--
-- Data for Name: reservations_summary; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reservations_summary (id, sports_facility_id, sports_facility_name, description, start_date, end_date, created_at) FROM stdin;
\.


--
-- Data for Name: sports_facility; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.sports_facility (id, owner_id, name, total_sports_fields, address_id, phone) FROM stdin;
\.


--
-- Data for Name: sports_field; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.sports_field (id, sports_facility_id, name, sport, is_indoor, owner_id, price_list_id, soccer_field_type, tennis_field_type) FROM stdin;
\.


--
-- Data for Name: sports_reservation_report; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.sports_reservation_report (id, total_reservations, sport, total_revenue, rejected_reservations, pending_reservations, accepted_reservations, id_reservations_summary) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, username, password, address_id, email, first_name, last_name, fiscal_code) FROM stdin;
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.address_id_seq', 1, false);


--
-- Name: reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservation_id_seq', 1, false);


--
-- Name: reservation_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservation_rating_id_seq', 1, false);


--
-- Name: reservations_summary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservations_summary_id_seq', 1, false);


--
-- Name: reservations_summary_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservations_summary_id_seq1', 1, false);


--
-- Name: sports_facility_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.sports_facility_id_seq', 1, false);


--
-- Name: sports_field_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.sports_field_id_seq', 1, false);


--
-- Name: sports_field_price_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.sports_field_price_list_id_seq', 1, false);


--
-- Name: sports_reservation_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.sports_reservation_report_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: price_list price_list_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.price_list
    ADD CONSTRAINT price_list_pkey PRIMARY KEY (id);


--
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);


--
-- Name: reservation_rating reservation_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservation_rating
    ADD CONSTRAINT reservation_rating_pkey PRIMARY KEY (id);


--
-- Name: reservations_summary reservations_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations_summary
    ADD CONSTRAINT reservations_summary_pkey PRIMARY KEY (id);


--
-- Name: sports_facility sports_facility_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_facility
    ADD CONSTRAINT sports_facility_pkey PRIMARY KEY (id);


--
-- Name: sports_field sports_field_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_field
    ADD CONSTRAINT sports_field_pkey PRIMARY KEY (id);


--
-- Name: sports_reservation_report sports_reservation_report_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_reservation_report
    ADD CONSTRAINT sports_reservation_report_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: ix_user_fiscal_code; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX ix_user_fiscal_code ON public."user" USING btree (fiscal_code);


--
-- Name: reservation reservation_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id);


--
-- Name: reservation_rating reservation_rating_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservation_rating
    ADD CONSTRAINT reservation_rating_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservation(id);


--
-- Name: reservation reservation_sports_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_sports_field_id_fkey FOREIGN KEY (sports_field_id) REFERENCES public.sports_field(id);


--
-- Name: reservations_summary reservations_summary_sports_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations_summary
    ADD CONSTRAINT reservations_summary_sports_facility_id_fkey FOREIGN KEY (sports_facility_id) REFERENCES public.sports_facility(id);


--
-- Name: sports_facility sports_facility_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_facility
    ADD CONSTRAINT sports_facility_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id);


--
-- Name: sports_facility sports_facility_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_facility
    ADD CONSTRAINT sports_facility_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id);


--
-- Name: sports_field sports_field_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_field
    ADD CONSTRAINT sports_field_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id);


--
-- Name: sports_field sports_field_price_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_field
    ADD CONSTRAINT sports_field_price_list_id_fkey FOREIGN KEY (price_list_id) REFERENCES public.price_list(id);


--
-- Name: sports_field sports_field_sports_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_field
    ADD CONSTRAINT sports_field_sports_facility_id_fkey FOREIGN KEY (sports_facility_id) REFERENCES public.sports_facility(id);


--
-- Name: sports_reservation_report sports_reservation_report_id_reservations_summary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sports_reservation_report
    ADD CONSTRAINT sports_reservation_report_id_reservations_summary_fkey FOREIGN KEY (id_reservations_summary) REFERENCES public.reservations_summary(id);


--
-- Name: user user_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id);


--
-- PostgreSQL database dump complete
--

--
-- INSERT TABLE
--

INSERT INTO public.address (id,state,city,street_name,street_number,postcode) VALUES(nextval('public.address_id_seq'),'italia','napoli','via benedetto brin','69',80134);
INSERT INTO public.address (id,state,city,street_name,street_number,postcode) VALUES(nextval('public.address_id_seq'),'italia','napoli','via benedetto brin','70',80134);
INSERT INTO public.address (id,state,city,street_name,street_number,postcode) VALUES(nextval('public.address_id_seq'),'italia','napoli','via benedetto brin','71',80134);

INSERT INTO public.user (id,username,password,address_id,email,first_name,last_name,fiscal_code) VALUES(nextval('public.user_id_seq'),'luca','bianco',1,'lucabianco@fervento','luca','bianco','lslslslslsl');
INSERT INTO public.user (id,username,password,address_id,email,first_name,last_name,fiscal_code) VALUES(nextval('public.user_id_seq'),'lorenzo','destriere',2,'lorenzodestriere@fervento','lorenzo','destriere','ldldlldldld');
INSERT INTO public.user (id,username,password,address_id,email,first_name,last_name,fiscal_code) VALUES(nextval('public.user_id_seq'),'fabio','bianco',3,'fabiobianco@fervento','fabio','bianco','fsfsfslsffsl');

INSERT INTO public.price_list (id,price_per_hour) VALUES(nextval('public.sports_field_price_list_id_seq'),5);
INSERT INTO public.price_list (id,price_per_hour) VALUES(nextval('public.sports_field_price_list_id_seq'),6);
INSERT INTO public.price_list (id,price_per_hour) VALUES(nextval('public.sports_field_price_list_id_seq'),7);

INSERT INTO public.sports_facility (id,owner_id,name,total_sports_fields,address_id,phone) VALUES (nextval('public.sports_facility_id_seq'),1,'Fervento',10,1,'02828382383');
INSERT INTO public.sports_facility (id,owner_id,name,total_sports_fields,address_id,phone) VALUES (nextval('public.sports_facility_id_seq'),2,'Fervento2',11,1,'02228382383');
INSERT INTO public.sports_facility (id,owner_id,name,total_sports_fields,address_id,phone) VALUES (nextval('public.sports_facility_id_seq'),3,'Fervento3',12,1,'02328382383');

INSERT INTO public.sports_field (id,sports_facility_id,name,sport,is_indoor,owner_id,price_list_id,soccer_field_type,tennis_field_type) 
VALUES(nextval('public.sports_field_id_seq'),1,'soccer 5 field','soccer',TRUE,1,1,'5','4');
INSERT INTO public.sports_field (id,sports_facility_id,name,sport,is_indoor,owner_id,price_list_id,soccer_field_type,tennis_field_type) 
VALUES(nextval('public.sports_field_id_seq'),2,'soccer 5 field','soccer',TRUE,2,1,'5','4');
INSERT INTO public.sports_field (id,sports_facility_id,name,sport,is_indoor,owner_id,price_list_id,soccer_field_type,tennis_field_type) 
VALUES(nextval('public.sports_field_id_seq'),3,'soccer 5 field','soccer',TRUE,3,1,'5','4');


INSERT INTO  public.reservation(id,sports_field_id,owner_id,start_date,end_date,created_at,state,price) VALUES (nextval('public.reservation_id_seq'),1,1,'2023-4-22T13:00:00','2023-4-22T14:00:00','2023-4-21T10:00:00','pending',0);
INSERT INTO  public.reservation(id,sports_field_id,owner_id,start_date,end_date,created_at,state,price) VALUES (nextval('public.reservation_id_seq'),1,2,'2023-4-23T13:00:00','2023-4-23T14:00:00','2023-4-21T10:00:00','pending',0);
INSERT INTO  public.reservation(id,sports_field_id,owner_id,start_date,end_date,created_at,state,price) VALUES (nextval('public.reservation_id_seq'),1,3,'2023-4-24T13:00:00','2023-4-24T14:00:00','2023-4-21T10:00:00','pending',0);
        
ALTER TABLE public.user
ALTER COLUMN fiscal_code TYPE character varying(100);
ALTER TABLE public.user
ALTER COLUMN email TYPE character varying(100);
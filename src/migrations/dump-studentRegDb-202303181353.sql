--
-- PostgreSQL database cluster dump
--

-- Started on 2023-03-18 13:53:20

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-18 13:53:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-03-18 13:53:21

--
-- PostgreSQL database dump complete
--

--
-- Database "studentRegDb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-18 13:53:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3369 (class 1262 OID 16422)
-- Name: studentRegDb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "studentRegDb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "studentRegDb" OWNER TO postgres;

\connect "studentRegDb"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16424)
-- Name: administrator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrator (
    id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying,
    status integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    token character varying
);


ALTER TABLE public.administrator OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16423)
-- Name: administrator_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.administrator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.administrator_id_seq OWNER TO postgres;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 214
-- Name: administrator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.administrator_id_seq OWNED BY public.administrator.id;


--
-- TOC entry 219 (class 1259 OID 16448)
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    id integer NOT NULL,
    title character varying,
    description character varying,
    "maxCapacity" integer,
    status integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.course OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16447)
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_id_seq OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 218
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_id_seq OWNED BY public.course.id;


--
-- TOC entry 221 (class 1259 OID 16460)
-- Name: enrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollment (
    id integer NOT NULL,
    "studentId" integer,
    "courseId" integer,
    status integer DEFAULT 0,
    "enrolledDate" timestamp without time zone,
    "dropedDate" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.enrollment OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16459)
-- Name: enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrollment_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 220
-- Name: enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollment_id_seq OWNED BY public.enrollment.id;


--
-- TOC entry 217 (class 1259 OID 16436)
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id integer NOT NULL,
    name character varying,
    email character varying,
    password character varying,
    status integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.student OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16435)
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_id_seq OWNER TO postgres;

--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 216
-- Name: student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_id_seq OWNED BY public.student.id;


--
-- TOC entry 3188 (class 2604 OID 16427)
-- Name: administrator id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrator ALTER COLUMN id SET DEFAULT nextval('public.administrator_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 16451)
-- Name: course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course ALTER COLUMN id SET DEFAULT nextval('public.course_id_seq'::regclass);


--
-- TOC entry 3200 (class 2604 OID 16463)
-- Name: enrollment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment ALTER COLUMN id SET DEFAULT nextval('public.enrollment_id_seq'::regclass);


--
-- TOC entry 3192 (class 2604 OID 16439)
-- Name: student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student ALTER COLUMN id SET DEFAULT nextval('public.student_id_seq'::regclass);


--
-- TOC entry 3357 (class 0 OID 16424)
-- Dependencies: 215
-- Data for Name: administrator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrator (id, name, email, password, status, "createdAt", "updatedAt", token) FROM stdin;
1	admin	admin@test.com	sHr$5K#b	1	2023-03-17 21:15:15.351095	2023-03-17 21:15:15.351095	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AdGVzdC5jb20ifSwiaWF0IjoxNjc5MDY4MTA5fQ.XCSrRESJ45VAbv4Ot4q9T7_2dopsxF75SMNH0H6F_F4
\.


--
-- TOC entry 3361 (class 0 OID 16448)
-- Dependencies: 219
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, title, description, "maxCapacity", status, "createdAt", "updatedAt") FROM stdin;
2	Test Course	test	5	1	2023-03-16 18:41:42.130358	2023-03-16 18:41:42.130358
3	Test Course1	test	5	1	2023-03-17 09:27:16.708232	2023-03-17 09:27:16.708232
1	Test Course2	test	5	1	2023-03-16 18:38:15.732655	2023-03-16 18:38:15.732655
4	Test Courset	test	5	1	2023-03-17 21:32:07.692113	2023-03-17 21:32:07.692113
5	Test Coursen	test	5	1	2023-03-17 21:37:50.752742	2023-03-17 21:37:50.752742
\.


--
-- TOC entry 3363 (class 0 OID 16460)
-- Dependencies: 221
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollment (id, "studentId", "courseId", status, "enrolledDate", "dropedDate", "createdAt", "updatedAt") FROM stdin;
10	3	3	0	2023-03-17 17:07:09.589	2023-03-17 17:22:53.528	2023-03-17 17:07:09.594674	2023-03-17 17:07:09.594674
1	1	1	1	2023-03-17 14:46:09.323	\N	2023-03-17 14:46:09.323882	2023-03-17 14:46:09.323882
2	2	1	1	2023-03-17 14:48:09.323	\N	2023-03-17 14:46:09.323882	2023-03-17 14:46:09.323882
6	1	3	1	2023-03-17 16:53:38.958	\N	2023-03-17 16:53:38.959299	2023-03-17 16:53:38.959299
7	1	3	1	2023-03-17 16:59:28.921	\N	2023-03-17 16:59:28.927243	2023-03-17 16:59:28.927243
8	2	3	1	2023-03-17 17:00:13.195	\N	2023-03-17 17:00:13.19678	2023-03-17 17:00:13.19678
11	3	3	1	2023-03-17 18:15:01.689	\N	2023-03-17 18:15:01.692702	2023-03-17 18:15:01.692702
\.


--
-- TOC entry 3359 (class 0 OID 16436)
-- Dependencies: 217
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (id, name, email, password, status, "createdAt", "updatedAt") FROM stdin;
1	Saman	test@gmail.com	Qa2@3Ht	1	2023-03-17 14:46:04.755565	2023-03-17 14:46:04.755565
2	John	john@gmail.com	HrD5V$a	1	2023-03-17 14:46:04.755565	2023-03-17 14:46:04.755565
3	Paul	paul@gmail.com	Cfg%D5VMj	1	2023-03-17 14:46:04.755565	2023-03-17 14:46:04.755565
\.


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 214
-- Name: administrator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.administrator_id_seq', 1, false);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 218
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_id_seq', 5, true);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 220
-- Name: enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollment_id_seq', 11, true);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 216
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_id_seq', 1, false);


--
-- TOC entry 3207 (class 2606 OID 16446)
-- Name: student PK_3d8016e1cb58429474a3c041904; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 16468)
-- Name: enrollment PK_7e200c699fa93865cdcdd025885; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 16458)
-- Name: course PK_bf95180dd756fd204fb01ce4916; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 16434)
-- Name: administrator PK_ee58e71b3b4008b20ddc7b3092b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrator
    ADD CONSTRAINT "PK_ee58e71b3b4008b20ddc7b3092b" PRIMARY KEY (id);


--
-- TOC entry 3212 (class 2606 OID 16544)
-- Name: enrollment FK_5ce702e71b98cc1bb37b81e83d8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT "FK_5ce702e71b98cc1bb37b81e83d8" FOREIGN KEY ("studentId") REFERENCES public.student(id);


--
-- TOC entry 3213 (class 2606 OID 16539)
-- Name: enrollment FK_d1a599a7740b4f4bd1120850f04; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04" FOREIGN KEY ("courseId") REFERENCES public.course(id);


-- Completed on 2023-03-18 13:53:21

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-03-18 13:53:21

--
-- PostgreSQL database cluster dump complete
--


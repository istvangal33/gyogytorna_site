--
-- ReStart Physio - idopontfoglalo rendszer: adatbazis sema
--
-- Ez a fajl hozza letre az osszes tablat, tipust es megszoritast egy URES
-- adatbazisban. Adatot nem tartalmaz.
--
-- Hasznalat Supabase-en: Dashboard -> SQL Editor -> a fajl tartalmanak
-- bemasolasa -> Run.
--
-- Parancssorbol:
--   psql "<connection string>" -f db/sema.sql
--
-- Utana meg le kell futtatni a torzsadatokat:
--   node --env-file=.env.local scripts/seed-services.mjs
--   node --env-file=.env.local scripts/seed-munkaido.mjs
--
-- FONTOS: a btree_gist kiterjesztes nelkul a booking_no_overlap megszoritas
-- nem jon letre, es ket foglalas ugyanarra az idopontra is felvihetove valik.
--
-- Keszult: 2026-10-04, pg_dump --schema-only alapjan.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'BOOKED',
    'CANCELLED',
    'COMPLETED',
    'NO_SHOW'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'EMPLOYEE'
);


--
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Booking; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Booking" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "clientId" uuid NOT NULL,
    "serviceId" uuid NOT NULL,
    "staffId" uuid NOT NULL,
    "startsAt" timestamp(3) with time zone NOT NULL,
    "endsAt" timestamp(3) with time zone NOT NULL,
    status public."BookingStatus" DEFAULT 'BOOKED'::public."BookingStatus" NOT NULL,
    notes text,
    "createdById" uuid NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "reminderSentAt" timestamp with time zone,
    price integer NOT NULL
);


--
-- Name: Client; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Client" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    "createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PasswordResetToken" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    "tokenHash" text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "usedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: Service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Service" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    price integer NOT NULL,
    "durationMin" integer NOT NULL,
    "blockMin" integer NOT NULL,
    bookable boolean DEFAULT true NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: StaffServicePrice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."StaffServicePrice" (
    "staffId" uuid NOT NULL,
    "serviceId" uuid NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "StaffServicePrice_price_check" CHECK ((price >= 0))
);


--
-- Name: TimeOff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TimeOff" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "staffId" uuid,
    "startsAt" timestamp(3) with time zone NOT NULL,
    "endsAt" timestamp(3) with time zone NOT NULL,
    reason text
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "passwordHash" text,
    role public."Role" DEFAULT 'EMPLOYEE'::public."Role" NOT NULL,
    "canViewAll" boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "canBookOthers" boolean DEFAULT false NOT NULL,
    "passwordChangedAt" timestamp with time zone,
    "takesBookings" boolean DEFAULT true NOT NULL
);


--
-- Name: WorkingHours; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."WorkingHours" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "staffId" uuid NOT NULL,
    weekday integer NOT NULL,
    "startMinute" integer NOT NULL,
    "endMinute" integer NOT NULL
);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Client Client_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT "Client_email_key" UNIQUE (email);


--
-- Name: Client Client_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT "Client_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_tokenHash_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_tokenHash_key" UNIQUE ("tokenHash");


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: StaffServicePrice StaffServicePrice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StaffServicePrice"
    ADD CONSTRAINT "StaffServicePrice_pkey" PRIMARY KEY ("staffId", "serviceId");


--
-- Name: TimeOff TimeOff_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TimeOff"
    ADD CONSTRAINT "TimeOff_pkey" PRIMARY KEY (id);


--
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WorkingHours WorkingHours_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WorkingHours"
    ADD CONSTRAINT "WorkingHours_pkey" PRIMARY KEY (id);


--
-- Name: Booking booking_no_overlap; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT booking_no_overlap EXCLUDE USING gist ("staffId" WITH =, tstzrange("startsAt", "endsAt") WITH &&) WHERE ((status = 'BOOKED'::public."BookingStatus"));


--
-- Name: Booking_emlekezteto_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Booking_emlekezteto_idx" ON public."Booking" USING btree ("startsAt") WHERE ((status = 'BOOKED'::public."BookingStatus") AND ("reminderSentAt" IS NULL));


--
-- Name: Booking_staffId_startsAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Booking_staffId_startsAt_idx" ON public."Booking" USING btree ("staffId", "startsAt");


--
-- Name: PasswordResetToken_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PasswordResetToken_userId_idx" ON public."PasswordResetToken" USING btree ("userId");


--
-- Name: StaffServicePrice_staffId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "StaffServicePrice_staffId_idx" ON public."StaffServicePrice" USING btree ("staffId");


--
-- Name: TimeOff_staffId_startsAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TimeOff_staffId_startsAt_idx" ON public."TimeOff" USING btree ("staffId", "startsAt");


--
-- Name: WorkingHours_staffId_weekday_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "WorkingHours_staffId_weekday_idx" ON public."WorkingHours" USING btree ("staffId", weekday);


--
-- Name: Booking booking_set_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER booking_set_updated_at BEFORE UPDATE ON public."Booking" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: Client client_set_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER client_set_updated_at BEFORE UPDATE ON public."Client" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: Service service_set_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER service_set_updated_at BEFORE UPDATE ON public."Service" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: User user_set_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER user_set_updated_at BEFORE UPDATE ON public."User" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: Booking Booking_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Client"(id) ON DELETE RESTRICT;


--
-- Name: Booking Booking_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON DELETE RESTRICT;


--
-- Name: Booking Booking_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON DELETE RESTRICT;


--
-- Name: Booking Booking_staffId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES public."User"(id) ON DELETE RESTRICT;


--
-- Name: PasswordResetToken PasswordResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: StaffServicePrice StaffServicePrice_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StaffServicePrice"
    ADD CONSTRAINT "StaffServicePrice_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON DELETE CASCADE;


--
-- Name: StaffServicePrice StaffServicePrice_staffId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StaffServicePrice"
    ADD CONSTRAINT "StaffServicePrice_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: TimeOff TimeOff_staffId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TimeOff"
    ADD CONSTRAINT "TimeOff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES public."User"(id) ON DELETE SET NULL;


--
-- Name: WorkingHours WorkingHours_staffId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WorkingHours"
    ADD CONSTRAINT "WorkingHours_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES public."User"(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


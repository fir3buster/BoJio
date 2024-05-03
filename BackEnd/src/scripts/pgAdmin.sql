-- Table: public.activities

-- DROP TABLE IF EXISTS public.activities;

CREATE TABLE IF NOT EXISTS public.activities
(
    id integer NOT NULL DEFAULT nextval('activities_id_seq'::regclass),
    user_id integer,
    sport_type character varying(20) COLLATE pg_catalog."default" DEFAULT 'tennis'::character varying,
    title character varying(60) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    location character varying(50) COLLATE pg_catalog."default" NOT NULL,
    game_type character varying(10) COLLATE pg_catalog."default",
    min_people integer,
    max_people integer,
    skill_rate character varying(10) COLLATE pg_catalog."default",
    game_private boolean DEFAULT false,
    court_booked boolean DEFAULT false,
    start_time time without time zone,
    end_time time without time zone,
    CONSTRAINT activities_pkey PRIMARY KEY (id),
    CONSTRAINT activities_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.user_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.activities
    OWNER to postgres;


-- Table: public.activity_user_decisions

-- DROP TABLE IF EXISTS public.activity_user_decisions;

CREATE TABLE IF NOT EXISTS public.activity_user_decisions
(
    id integer NOT NULL DEFAULT nextval('activity_user_decisions_id_seq'::regclass),
    activity_id integer,
    user_id integer,
    is_going boolean DEFAULT false,
    is_active boolean DEFAULT true,
    CONSTRAINT activity_user_decisions_pkey PRIMARY KEY (id),
    CONSTRAINT activity_user_decisions_activity_id_fkey FOREIGN KEY (activity_id)
        REFERENCES public.activities (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT activity_user_decisions_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.user_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.activity_user_decisions
    OWNER to postgres;



-- Table: public.admin_user_data

-- DROP TABLE IF EXISTS public.admin_user_data;

CREATE TABLE IF NOT EXISTS public.admin_user_data
(
    id integer NOT NULL DEFAULT nextval('admin_user_data_id_seq'::regclass),
    user_id integer NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    CONSTRAINT admin_user_data_pkey PRIMARY KEY (id),
    CONSTRAINT admin_user_data_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.user_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.admin_user_data
    OWNER to postgres;


-- Table: public.roles

-- DROP TABLE IF EXISTS public.roles;

CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    role_type character varying(20) COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT roles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roles
    OWNER to postgres;

-- Table: public.sports_cards

-- DROP TABLE IF EXISTS public.sports_cards;

CREATE TABLE IF NOT EXISTS public.sports_cards
(
    id integer NOT NULL DEFAULT nextval('sports_cards_id_seq'::regclass),
    sport_type character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'tennis'::character varying,
    skill_level character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'beginner'::character varying,
    skill_rate character varying(10) COLLATE pg_catalog."default" DEFAULT 'unrated'::character varying,
    user_id integer NOT NULL,
    CONSTRAINT sports_cards_pkey PRIMARY KEY (id),
    CONSTRAINT sports_cards_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.user_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sports_cards
    OWNER to postgres;

-- Table: public.user_followers

-- DROP TABLE IF EXISTS public.user_followers;

CREATE TABLE IF NOT EXISTS public.user_followers
(
    id integer NOT NULL DEFAULT nextval('user_followers_id_seq'::regclass),
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    CONSTRAINT user_followers_pkey PRIMARY KEY (id),
    CONSTRAINT user_followers_followee_id_fkey FOREIGN KEY (follower_id)
        REFERENCES public.user_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_followers_follower_id_fkey FOREIGN KEY (following_id)
        REFERENCES public.user_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_followers
    OWNER to postgres;

-- Table: public.user_profiles

-- DROP TABLE IF EXISTS public.user_profiles;

CREATE TABLE IF NOT EXISTS public.user_profiles
(
    id integer NOT NULL DEFAULT nextval('user_profiles_id_seq'::regclass),
    email character varying(50) COLLATE pg_catalog."default",
    hashed_password character varying(255) COLLATE pg_catalog."default",
    profile_name character varying(30) COLLATE pg_catalog."default",
    first_name character varying(30) COLLATE pg_catalog."default",
    last_name character varying(30) COLLATE pg_catalog."default",
    profile_picture_url character varying(255) COLLATE pg_catalog."default",
    bio character varying(255) COLLATE pg_catalog."default",
    gender character varying(10) COLLATE pg_catalog."default",
    role character varying(15) COLLATE pg_catalog."default" DEFAULT 'user'::character varying,
    created_date timestamp without time zone DEFAULT now(),
    last_login_date timestamp without time zone DEFAULT now(),
    location character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT user_profiles_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_profiles
    OWNER to postgres;
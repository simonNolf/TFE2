PGDMP  /                    |            TFE    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16561    TFE    DATABASE     y   CREATE DATABASE "TFE" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Belgium.1252';
    DROP DATABASE "TFE";
                postgres    false            �            1259    16562    user    TABLE     #  CREATE TABLE public."user" (
    matricule character varying(8) NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    activation_expiration timestamp with time zone NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �          0    16562    user 
   TABLE DATA           Z   COPY public."user" (matricule, password, salt, status, activation_expiration) FROM stdin;
    public          postgres    false    215   �       Q           2606    16569    user user_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (matricule);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    215            �   x   x��p542615�T1JR14P1r71�0���-6�.1�H�u�H�p���7�r�,	,�r�+�.-5�25ҏt�q7,į�� 5/%3/�����D��X��X��������\���R���+F��� ߖ%�     
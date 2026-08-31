-- Migration initiale : table des contributions communautaires
-- (nouveaux mots ou corrections proposés par les visiteurs, en attente de validation admin)

CREATE TABLE IF NOT EXISTS contributions (
    id            SERIAL PRIMARY KEY,
    type          TEXT NOT NULL CHECK (type IN ('nouveau_mot', 'correction')),
    mot           TEXT NOT NULL,
    categorie     TEXT,
    traduction_fr TEXT,
    traduction_en TEXT,
    traduction_ar TEXT,
    commentaire   TEXT,
    -- Référence au mot existant si c'est une correction (index dans mots.json, optionnel)
    mot_original  TEXT,
    statut        TEXT NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'approuve', 'rejete')),
    contributeur_nom   TEXT,
    contributeur_email TEXT,
    cree_le       TIMESTAMPTZ NOT NULL DEFAULT now(),
    traite_le     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_contributions_statut ON contributions(statut);

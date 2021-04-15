import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import styled from 'styled-components';

import { FileUpload } from '../FileUpload';
import type { FormData } from './EventForm';

const InvisiLabel = styled.label`
  display: none;
`;

type Props = { values: FormData; isSubmitting: boolean; handleChange: any };

const SectionUsage: React.FC<Props> = ({
  values,
  isSubmitting,
  handleChange,
}) => {
  const charRemaining = {
    title: 80 - values.title.length,
    description: 200 - values.description.length,
    details: 2000 - values.details.length,
  };
  return (
    <>
      <section>
        <h3>Bitte formulieren Sie Angaben zur Veranstaltung</h3>
        <InvisiLabel htmlFor="title">
          Titel der Veranstaltung (wird veröffentlicht)
        </InvisiLabel>
        <Field
          id="title"
          name="title"
          type="text"
          component={TextField}
          label="Titel der Veranstaltung (wird veröffentlicht)"
          placeholder="z.B. Sommerkonzert Xhain-Spatzen"
          fullWidth
        />
        <p>Noch {charRemaining.title} Zeichen.</p>
        <InvisiLabel htmlFor="description">
          Ankündigung der Veranstaltung (wird veröffentlicht)
        </InvisiLabel>
        <Field
          id="description"
          name="description"
          type="text"
          component={TextField}
          label="Ankündigung der Veranstaltung (wird veröffentlicht)"
          placeholder="z.B. Violinkonzert mit Kinderchor der Gesamtschule Xhain. Alle sind willkommen, Eintritt frei. Bringen Sie eine Sitzgelegenheit und Getränke mit."
          fullWidth
          multiline
          rows={4}
        />
        <p>Noch {charRemaining.description} Zeichen.</p>

        <h4>Angaben zum Veranstaltungskonzept</h4>
        <p>
          Bitte machen Sie hier zur Prüfung der Genehmigungsfähigkeit nach Art
          der Veranstaltung Angaben zum Sinn und Zweck der Veranstaltung, zur
          anvisierten Zielgruppe, möglicher Essens- und Getränkeausgabe,
          Bühnenprogramm und Musikeinsatz und sonstigen wichtigen Hintergründen
          für eine Veranstaltung im öffentlichen Raum. Machen Sie außerdem
          Angaben zum zeitlichen Programm (Musikzeiten, Pausen, etc.)
        </p>
        <p>
          <a
            className="external"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.berlin.de/ba-friedrichshain-kreuzberg/politik-und-verwaltung/aemter/strassen-und-gruenflaechenamt/genehmigungen-von-veranstaltungen-im-oefentlichen-raum/"
          >
            Weitergehende Information zu genehmigungsfähigen
            Veranstaltungskonzepten
          </a>
        </p>
        <InvisiLabel htmlFor="details">Veranstaltungskonzept</InvisiLabel>
        <Field
          id="details"
          name="details"
          type="text"
          component={TextField}
          label="Veranstaltungskonzept"
          fullWidth
          multiline
          rows={8}
        />
        <p>Noch {charRemaining.details} Zeichen.</p>
      </section>

      <section>
        <h4>Versicherungsbestätigung</h4>
        <p>
          Bitte laden Sie das ausgefüllte und unterschriebene Formblatt zur
          Versicherungsbestätigung hoch.
        </p>
        <FileUpload
          name="insurance"
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
        >
          PDF-Datei mit Versicherungsbestätigung auswählen
        </FileUpload>
      </section>

      <section>
        <h4>Veranstaltererklärung</h4>
        <p>
          Bitte laden Sie das ausgefüllte und unterschriebene Formblatt zur
          Veranstaltererklärung hoch.
        </p>
        <FileUpload
          name="agreement"
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
        >
          PDF-Datei mit Veranstaltererklärung auswählen
        </FileUpload>
      </section>

      <section>
        <h4>Nachweis der Gemeinnützigkeit</h4>
        <p>
          Nur für gemeinnützige Antragssteller*innen: Bitte laden Sie einen
          Nachweis der Gemeinnützigkeit hoch.
        </p>
        <FileUpload
          name="public_benefit"
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
        >
          PDF-Datei mit Nachweis der Gemeinnützigkeit auswählen
        </FileUpload>
      </section>
    </>
  );
};

export default SectionUsage;

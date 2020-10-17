import React from 'react';
import { storiesOf } from '@storybook/react';

import { H1, H2, H3, H4, H5, H6, P, Label, Small, Pre, Var } from '../src/Typography';

const stories = storiesOf('Typography', module);

stories.add('Overview', () => (
  <>
    <H1>h1. Heading</H1>
    <H2>h2. Heading</H2>
    <H3>h3. Heading</H3>
    <H4>h4. Heading</H4>
    <H5>h5. Heading</H5>
    <H6 color="secondary">h6. Heading</H6>
    <P>
      p. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque
      doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </P>
    <Small>small. Small</Small>
    <br />
    <Pre contained>pre. Contained preformatted text</Pre>
    <br />
    <Label>label. Label</Label>
    <Var contained>var. Contained variable</Var>
    <br />
    <hr />
    <br />
    <H1 bottomGutter="tiny">Lorem Ipsum</H1>
    <H4 color="lightText">Neque porro quisquam</H4>
    <P>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
      qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?
    </P>
  </>
));

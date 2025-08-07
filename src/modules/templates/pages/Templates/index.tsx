import React, { useEffect, useState } from 'react';
import Title from '@components/Title';
import { useTemplate } from '@modules/templates/hooks/index';
import { ITemplate } from '@modules/templates/interfaces/ITemplate';
import AddTemplateFileButton from '@modules/templates/components/AddTemplateFileButton';
import { Container, Content, Header } from './styles';

const Equipments: React.FC = () => {
  useEffect(() => {
    document.title = 'Exy | Templates';
  }, []);

  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const { ListTemplates } = useTemplate();

  const { data } = ListTemplates();

  useEffect(() => {
    if (data) {
      setTemplates(data);
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <Title value="Templates" />
      </Header>

      <Content>
        {templates.map((template) => (
          <AddTemplateFileButton key={template.id} template={template} />
        ))}
      </Content>
    </Container>
  );
};

export default Equipments;

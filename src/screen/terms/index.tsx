import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Link href="/register" style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Voltar ao Cadastro"}</Text>
        </Link>
        <Text style={styles.title}>Termos de Uso</Text>
        <Text style={styles.paragraph}>
          Bem-vindo ao DoHero! Ao usar nosso aplicativo, você concorda com estes
          termos.
        </Text>
        <Text style={styles.sectionTitle}>1. Uso do Aplicativo</Text>
        <Text style={styles.paragraph}>
          O DoHero é uma ferramenta para ajudá-lo a construir e rastrear hábitos
          de forma gamificada. Você concorda em usar o aplicativo apenas para
          fins legais e de acordo com estes termos.
        </Text>
        <Text style={styles.sectionTitle}>2. Contas de Usuário</Text>
        <Text style={styles.paragraph}>
          Para usar o DoHero, você precisa criar uma conta fornecendo um e-mail
          e uma senha. Você é responsável por manter a confidencialidade de sua
          conta e por todas as atividades que ocorrem sob ela.
        </Text>
        <Text style={styles.sectionTitle}>3. Propriedade Intelectual</Text>
        <Text style={styles.paragraph}>
          O aplicativo e seu conteúdo original, recursos e funcionalidades são e
          permanecerão propriedade exclusiva do DoHero e de seus licenciadores.
        </Text>
        <Text style={styles.sectionTitle}>
          4. Limitação de Responsabilidade
        </Text>
        <Text style={styles.paragraph}>
          Em nenhuma circunstância o DoHero será responsável por quaisquer danos
          indiretos, incidentais, especiais, consequenciais ou punitivos.
        </Text>
        <Text style={styles.sectionTitle}>5. Alterações nos Termos</Text>
        <Text style={styles.paragraph}>
          Reservamo-nos o direito de modificar ou substituir estes Termos a
          qualquer momento. Avisaremos sobre quaisquer alterações, publicando os
          novos Termos no aplicativo.
        </Text>
        <Text style={styles.lastUpdated}>
          Última atualização: 23 de Setembro de 2025
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Link href="/register" style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Voltar ao Cadastro"}</Text>
        </Link>
        <Text style={styles.title}>Política de Privacidade</Text>
        <Text style={styles.paragraph}>
          A sua privacidade é importante para nós. Esta política explica como
          coletamos, usamos e protegemos suas informações quando você usa nosso
          aplicativo DoHero.
        </Text>
        <Text style={styles.sectionTitle}>1. Informações que Coletamos</Text>
        <Text style={styles.paragraph}>
          Coletamos as informações que você nos fornece diretamente ao criar uma
          conta, que incluem seu nome e endereço de e-mail.
        </Text>
        <Text style={styles.sectionTitle}>2. Como Usamos Suas Informações</Text>
        <Text style={styles.paragraph}>
          Usamos as informações coletadas para criar e gerenciar sua conta,
          fornecer e manter nosso aplicativo, e melhorar sua experiência.
        </Text>
        <Text style={styles.sectionTitle}>3. Segurança dos Dados</Text>
        <Text style={styles.paragraph}>
          Utilizamos medidas de segurança para proteger suas informações
          pessoais. No entanto, nenhum sistema de segurança é impenetrável.
        </Text>
        <Text style={styles.sectionTitle}>4. Seus Direitos</Text>
        <Text style={styles.paragraph}>
          Você tem o direito de acessar, corrigir ou excluir suas informações
          pessoais a qualquer momento entrando em contato conosco.
        </Text>
        <Text style={styles.lastUpdated}>
          Última atualização: 23 de Setembro de 2025
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

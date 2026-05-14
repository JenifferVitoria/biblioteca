package br.com.empresa18.integracao.bibliotecaestantemagica.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

public class QrCodeUtils {

	
	 // --- FUNÇÃO PARA GERAR A STRING (BR CODE) ---
	public static String gerarPayloadPix(String chave, String nome, String cidade, String valor, String id) {
	    // 00: Versão do Payload
	    String payload = formatarCampo("00", "01");

	    // 26: Informações da Conta (Sub-campos 00 e 01)
	    String subCampo00 = formatarCampo("00", "BR.GOV.BCB.PIX");
	    String subCampo01 = formatarCampo("01", chave);
	    payload += formatarCampo("26", subCampo00 + subCampo01);

	    // 52: Categoria (0000 = Geral)
	    payload += formatarCampo("52", "0000");

	    // 53: Moeda (986 = Real)
	    payload += formatarCampo("53", "986");

	    // 54: Valor (Opcional no payload, mas se existir deve ser formatado)
	    if (valor != null && !valor.isEmpty() && !valor.equals("0.00")) {
	        payload += formatarCampo("54", valor);
	    }

	    // 58: País
	    payload += formatarCampo("58", "BR");

	    // 59: Nome do Recebedor
	    payload += formatarCampo("59", nome);

	    // 60: Cidade
	    payload += formatarCampo("60", cidade);

	    // 62: Campo de ID (TXID)
	    String subCampo05 = formatarCampo("05", (id == null || id.isEmpty()) ? "***" : id);
	    payload += formatarCampo("62", subCampo05);

	    // 63: CRC16 (Início do campo)
	    payload += "6304";

	    // Adiciona o CRC16 final
	    return payload + calcularCRC16(payload);
	}

	// MÉTODO AUXILIAR PARA GARANTIR O TAMANHO CORRETO
	private static String formatarCampo(String id, String valor) {
	    // Garante que o tamanho tenha sempre 2 dígitos (ex: 05, 12, 25)
	    String tamanho = String.format("%02d", valor.length());
	    return id + tamanho + valor;
	}

   // --- FUNÇÃO PARA GERAR A IMAGEM ---
   public static void gerarQRCodeImage(String text, int width, int height, String filePath) throws WriterException, IOException {
       QRCodeWriter qrCodeWriter = new QRCodeWriter();
       Map<EncodeHintType, Object> hints = new HashMap<>();
       hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.Q);
       BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height, hints);

       Path path = FileSystems.getDefault().getPath(filePath);
       MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
   }

   // --- CALCULO CRC16 CCITT (Obrigatório no Pix) ---
   private static String calcularCRC16(String payload) {
       int crc = 0xFFFF;
       int polynomial = 0x1021;
       byte[] bytes = payload.getBytes();
       for (byte b : bytes) {
           for (int i = 0; i < 8; i++) {
               boolean bit = ((b >> (7 - i) & 1) == 1);
               boolean c15 = ((crc >> 15 & 1) == 1);
               crc <<= 1;
               if (c15 ^ bit) crc ^= polynomial;
           }
       }
       crc &= 0xFFFF;
       String hex = Integer.toHexString(crc).toUpperCase();
       while (hex.length() < 4) hex = "0" + hex;
       return hex;
   }	
	
}




//EXEMPLO DE USO:
// TODO Auto-generated method stub
// --- DADOS DA CHAVE PIX PESSOAL ---
//String chavePix = "07139541671"; // CPF, E-mail, Telefone ou Chave Aleatória
//String nomeRecebedor = "FERNANDO GOMES DA SILVA";
//String cidadeRecebedor = "BELO HORIZONTE";
//String valor = "0.30"; // Opcional, deixe null ou "0.00" se não quiser valor fixo
//String identificador = "123"; // Opcional, ajuda a identificar o pagamento
//
//try {
//  String payload = gerarPayloadPix(chavePix, nomeRecebedor, cidadeRecebedor, valor, identificador);
//  System.out.println("Payload Pix: " + payload);
//  
//  String filePath = "pix_qrcode1.png";
//  
//  gerarQRCodeImage(payload, 350, 350, filePath);
//  System.out.println("QR Code gerado em: " + filePath);
//} catch (Exception e) {
//  e.printStackTrace(); 
//}

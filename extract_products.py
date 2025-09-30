#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para extraer todos los productos de seguridad del archivo ProductosAPSafety.html
y convertirlos a formato JSON estructurado.
"""

import re
import json
import html

def extract_products_from_html(file_path):
    """
    Extrae todos los productos del archivo HTML y los estructura en formato JSON.
    """
    products = []

    # Leer el archivo HTML
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Buscar todas las filas de productos usando regex
    # Patrón para encontrar filas completas de la tabla
    row_pattern = r'<tr id="[^"]*">(.*?)</tr>'
    rows = re.findall(row_pattern, content, re.DOTALL)

    for row in rows:
        # Extraer cada celda de la fila
        cells = re.findall(r'<td class="[^"]*">(.*?)</td>', row, re.DOTALL)

        if len(cells) >= 7:  # Asegurar que tenemos suficientes celdas
            product = {}

            # Extraer nombre del producto (primera celda)
            name_match = re.search(r'<a href="[^"]*">([^<]+)</a>', cells[0])
            if name_match:
                product['nombre'] = name_match.group(1).strip()
            else:
                continue  # Saltar si no encontramos nombre

            # Extraer tipo/categoría (segunda celda)
            type_match = re.search(r'<span[^>]*>([^<]+)</span>', cells[1])
            if type_match:
                product['tipo_categoria'] = type_match.group(1).strip()
            else:
                product['tipo_categoria'] = ''

            # Extraer protección/etiqueta (tercera celda)
            protection_content = re.sub(r'<[^>]+>', '', cells[2])
            product['proteccion'] = html.unescape(protection_content).strip()

            # Extraer aplicaciones (cuarta celda)
            applications_content = re.sub(r'<br\s*/?>', '\n', cells[3])
            applications_content = re.sub(r'<[^>]+>', '', applications_content)
            product['aplicaciones'] = html.unescape(applications_content).strip()

            # Extraer características (quinta celda)
            characteristics_content = re.sub(r'<br\s*/?>', '\n', cells[4])
            characteristics_content = re.sub(r'<[^>]+>', '', characteristics_content)
            product['caracteristicas'] = html.unescape(characteristics_content).strip()

            # Extraer URL de video (sexta celda)
            video_match = re.search(r'<a href="([^"]+)"[^>]*>[^<]*</a>', cells[5])
            if video_match:
                product['url_video'] = video_match.group(1).strip()
            else:
                product['url_video'] = ''

            # Extraer URL de ficha técnica (séptima celda)
            tech_sheet_match = re.search(r'<a href="([^"]+)"[^>]*>[^<]*</a>', cells[6])
            if tech_sheet_match:
                product['url_ficha_tecnica'] = tech_sheet_match.group(1).strip()
            else:
                product['url_ficha_tecnica'] = ''

            # Extraer texto adicional (octava celda, si existe)
            if len(cells) > 7:
                text_content = re.sub(r'<br\s*/?>', '\n', cells[7])
                text_content = re.sub(r'<[^>]+>', '', text_content)
                product['texto_adicional'] = html.unescape(text_content).strip()
            else:
                product['texto_adicional'] = ''

            # Extraer ventajas (novena celda, si existe)
            if len(cells) > 8:
                advantages_content = re.sub(r'<br\s*/?>', '\n', cells[8])
                advantages_content = re.sub(r'<[^>]+>', '', advantages_content)
                product['ventajas'] = html.unescape(advantages_content).strip()
            else:
                product['ventajas'] = ''

            products.append(product)

    return products

def main():
    """
    Función principal que ejecuta la extracción y guarda el resultado.
    """
    html_file = "C:\\Users\\Administrator\\Desktop\\safetynew-v1\\ProductosAPSafety.html"
    output_file = "C:\\Users\\Administrator\\Desktop\\safetynew-v1\\productos_ap_safety.json"

    try:
        print("Extrayendo productos del archivo HTML...")
        products = extract_products_from_html(html_file)

        print(f"Se encontraron {len(products)} productos.")

        # Guardar en formato JSON
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(products, file, ensure_ascii=False, indent=2)

        print(f"Productos guardados en: {output_file}")

        # Mostrar los primeros productos como muestra
        print("\nPrimeros 3 productos extraídos:")
        for i, product in enumerate(products[:3]):
            print(f"\n{i+1}. {product['nombre']}")
            print(f"   Tipo: {product['tipo_categoria']}")
            print(f"   Protección: {product['proteccion']}")
            if product['url_video']:
                print(f"   Video: {product['url_video']}")
            if product['url_ficha_tecnica']:
                print(f"   Ficha técnica: {product['url_ficha_tecnica']}")

        return products

    except Exception as e:
        print(f"Error al procesar el archivo: {e}")
        return []

if __name__ == "__main__":
    products = main()
"use server";

import { revalidatePath } from "next/cache";
import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function addSimilarWord(id, word_id) {
  // TEMPORARY TO DEPLOY
  return {
    success: false,
    message: "Permission Denied",
  };
  if (id === word_id) {
    return {
      success: false,
      message: "A word cannot be added to its own similar words list",
    };
  }
  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");

  const bulkOperations = [
    {
      updateOne: {
        filter: { _id: ObjectId.createFromHexString(id) },
        update: {
          $addToSet: { similar_words: word_id },
        },
      },
    },
    {
      updateOne: {
        filter: { _id: ObjectId.createFromHexString(word_id) },
        update: {
          $addToSet: { similar_words: id },
        },
      },
    },
  ];

  const result = await collection.bulkWrite(bulkOperations);
  if (result.matchedCount == 2) {
    if (result.modifiedCount == 2) {
      revalidatePath("/");
      return { success: true, message: "Successfully Added Word" };
    }
    return {
      success: false,
      message: "That word has already been Added as similar",
    };
  }
  return { success: false, message: "Something went wrong" };
}

export async function addRootWord(id, word_id) {
  // TEMPORARY TO DEPLOY
  return {
    success: false,
    message: "Permission Denied",
  };
  if (id === word_id) {
    return {
      success: false,
      message: "Cannot add itself as root word",
    };
  }
  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");

  const result = await collection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: {
        root_word: word_id,
      },
    }
  );
  if (result.matchedCount == 1) {
    if (result.modifiedCount == 1) {
      revalidatePath("/");
      return { success: true, message: "Successfully Added Root Word" };
    }
    return {
      success: false,
      message: "That word has already been been set as the Root word",
    };
  }
  return { success: false, message: "Something went wrong" };
}

export async function deleteWord(id, similar_words) {
  // TEMPORARY TO DEPLOY
  return {
    success: false,
    message: "Permission Denied",
  };
  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");

  // Create the bulk operations
  const bulkOperations = [
    {
      deleteOne: {
        filter: {
          _id: ObjectId.createFromHexString(id),
        },
      },
    },
    {
      updateMany: {
        filter: {
          _id: {
            $in: similar_words.map((word_id) =>
              ObjectId.createFromHexString(word_id)
            ),
          },
        },
        update: {
          $pull: {
            similar_words: id,
          },
        },
      },
    },
    {
      updateMany: {
        filter: {
          root_word: id,
        },
        update: {
          $set: {
            root_word: null,
          },
        },
      },
    },
  ];

  const result = await collection.bulkWrite(bulkOperations);

  if (result.deletedCount) {
    revalidatePath("/");
    return { success: true, message: "Word deleted successfully" };
  } else {
    return { success: false, message: "Something went wrong" };
  }
}

export async function addNewWord(
  arabic,
  translation,
  pronounciation,
  tags,
  gender
) {
  // TEMPORARY TO DEPLOY
  return {
    success: false,
    message: "Permission Denied",
  };
  if (!arabic.trim() || !translation.trim() || !gender.trim()) {
    return {
      success: false,
      message: "Submitted Values are not valid",
    };
  }
  const regex = /^[a-zA-Z ,()]*$/;
  if (!regex.test(translation) || !regex.test(tags)) {
    return {
      success: false,
      message: "Submitted Values are not valid",
    };
  }

  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");
  const document = {
    arabic: arabic.trim(),
    pronounciation: pronounciation.trim(),
    translation: translation
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s),
    tags: tags
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s),
    root_word: null,
    similar_words: [],
    gender: gender,
  };

  try {
    const result = await collection.insertOne(document);
    if (result.insertedId) {
      revalidatePath("/");
      return {
        success: true,
        message: "Word succesfully created",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  } catch (err) {
    return {
      success: false,
      message:
        err.code == 11000 ? "Word already exists" : "Something went wrong",
    };
  }
}

export async function EditWord(
  id,
  arabic,
  translation,
  pronounciation,
  tags,
  gender
) {
  // TEMPORARY TO DEPLOY
  return {
    success: false,
    message: "Permission Denied",
  };

  if (!arabic.trim() || !translation.trim() || !gender.trim()) {
    return {
      success: false,
      message: "Submitted Values are not valid",
    };
  }
  const regex = /^[a-zA-Z ,()]*$/;
  if (!regex.test(translation) || !regex.test(tags)) {
    return {
      success: false,
      message: "Submitted Values are not valid",
    };
  }

  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");
  const document = {
    arabic: arabic.trim(),
    pronounciation: pronounciation.trim(),
    translation: translation
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s),
    tags: tags
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s),
    gender: gender,
  };

  const result = await collection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    { $set: document }
  );

  if (result.matchedCount == 1) {
    if (result.modifiedCount == 1) {
      revalidatePath("/");
      return { success: true, message: "Successfully Edited Word" };
    }
    return {
      success: false,
      message: "None of the fields were modified",
    };
  }
  return { success: false, message: "Something went wrong" };
}
